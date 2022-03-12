import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import moment from 'moment';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import FaceIcon from '@mui/icons-material/Face';

import socket from 'shared/socket';
import { Conversation, User, SendMessage, Message } from 'shared/interfaces';
import {
  getConversation as getConversationAction,
  sendMessage as sendMessageAction,
  addMessage as addMessageAction,
} from 'actions/conversation.action';
import locale from 'shared/locale.json';

import Bubble from './Bubble';

interface ChatProps {
  conversationId: string;
  getConversation: Function;
  conversation: Conversation;
  user: User;
  sendMessage: Function;
  addMessage: Function;
}

const Chat: React.FC<ChatProps> = ({
  conversationId,
  getConversation,
  conversation,
  user,
  sendMessage,
  addMessage,
}) => {
  const [messageString, setMessageString] = useState('');
  const [typingUsers, setTypingUsers] = useState<User[] | []>([]);

  const filteredTypingUsers = (): User[] =>
    typingUsers.filter((item) => item._id !== user._id);

  const onSend = (value: string) => {
    sendMessage({ conversationId, message: value });
    setMessageString('');
  };

  const typingUsersArray = () => {
    filteredTypingUsers();
    if (messageString) return [...filteredTypingUsers(), user];
    return filteredTypingUsers();
  };

  useEffect(() => {
    getConversation(conversationId);
    socket.io?.on(conversationId, (message) => addMessage(message));
    socket.io?.on(`${conversationId}/typing`, (users) => setTypingUsers(users));

    return () => {
      socket.io?.off(conversationId);
    };
  }, []);

  useEffect(() => {
    socket.io?.emit('typing', {
      conversationId,
      users: typingUsersArray(),
    });
  }, [messageString]);

  if (isEmpty(conversation)) return <div>Loading...</div>;

  const participant = conversation.participants.filter(
    (item) => item._id !== user._id,
  )[0];

  const participantFullname = (participants: User) =>
    `${participants.firstname} ${participants.lastname}`;

  const _30MinDiff = ({
    timeRaw,
    messageTimeRaw,
  }: {
    timeRaw: string;
    messageTimeRaw: string;
  }) => {
    const time = moment(timeRaw);
    const messageTime = moment(messageTimeRaw);
    return (
      messageTime.diff(time, 'minutes') > 30 ||
      messageTime.diff(time, 'minutes') < -30
    );
  };

  const reversedMessages = orderBy(conversation.messages, 'createdAt', 'desc');

  return (
    <Box position="relative" height="100%">
      <Box
        sx={{
          padding: '5px 20px',
          boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.2)',
          width: '-webkit-fill-available',
        }}
        position="absolute"
        top="0"
        display="flex"
        alignItems="center"
      >
        <Box>
          <FaceIcon sx={{ height: '55px', width: '55px' }} />
        </Box>
        <Box padding="0 10px">{participantFullname(participant)}</Box>
      </Box>

      {isEmpty(reversedMessages) && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h6">{locale.sayHi}</Typography>
        </Box>
      )}

      {!isEmpty(reversedMessages) && (
        <Box
          position="absolute"
          sx={{ margin: '70px 0px 55px 0px', padding: '20px 0px' }}
          height="-webkit-fill-available"
          width="-webkit-fill-available"
          overflow="auto"
          display="flex"
          flexDirection="column-reverse"
        >
          {reversedMessages.map((message, i) => (
            <Box key={message._id}>
              {(!reversedMessages[i + 1]?.createdAt ||
                _30MinDiff({
                  timeRaw: reversedMessages[i + 1]?.createdAt,
                  messageTimeRaw: message.createdAt,
                })) && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{ color: '#8a8d91', fontWeight: 'bold' }}
                    variant="caption"
                    component="div"
                  >
                    {moment(message.createdAt).format('D/M/yyyy, hh:mm a')}
                  </Typography>
                </Box>
              )}
              <Box sx={{ padding: '1px 10px' }}>
                <Bubble
                  message={message}
                  loggedUser={user}
                  prevMessage={reversedMessages[i + 1]}
                  nextMessage={reversedMessages[i - 1]}
                  firstMessage={
                    !reversedMessages[i + 1]?.createdAt ||
                    _30MinDiff({
                      timeRaw: reversedMessages[i + 1]?.createdAt,
                      messageTimeRaw: message.createdAt,
                    })
                  }
                  lastMessage={
                    !reversedMessages[i - 1]?.createdAt ||
                    _30MinDiff({
                      timeRaw: reversedMessages[i - 1]?.createdAt,
                      messageTimeRaw: message.createdAt,
                    })
                  }
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Box
        position="absolute"
        bottom="0"
        width="100%"
        sx={{ background: 'white' }}
      >
        {!isEmpty(filteredTypingUsers()) && (
          <Typography
            variant="caption"
            component="div"
            sx={{ padding: '0 10px' }}
          >
            {`${String(
              ...filteredTypingUsers().map((item) => item.firstname),
            )} ${locale.typing}...`}
          </Typography>
        )}
        <Box width="100%" display="flex" alignItems="center">
          <TextField
            fullWidth
            onChange={(e) => setMessageString(e.target.value)}
            value={messageString}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onSend(messageString);
            }}
          />
          <Box p={1}>
            <SendIcon
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => onSend(messageString)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: { conversation: Conversation; user: User }) => {
  const { conversation, user } = state;
  return { conversation, user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getConversation: (conversationId: string) =>
    dispatch(getConversationAction(conversationId)),
  sendMessage: ({ message, conversationId }: SendMessage) =>
    dispatch(sendMessageAction({ message, conversationId })),
  addMessage: (message: Message) => dispatch(addMessageAction({ message })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
