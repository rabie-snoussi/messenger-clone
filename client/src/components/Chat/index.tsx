import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';

import { Conversation, User, SendMessage } from 'shared/interfaces';
import {
  getConversation as getConversationAction,
  sendMessage as sendMessageAction,
} from 'actions/conversation.action';
import Bubble from './Bubble';

interface ChatProps {
  conversationId: string;
  getConversation: Function;
  conversation: Conversation;
  user: User;
  sendMessage: Function;
}

const Chat: React.FC<ChatProps> = ({
  conversationId,
  getConversation,
  conversation,
  user,
  sendMessage,
}) => {
  const [messageString, setMessageString] = useState('');

  const onSend = (value: string) => {
    sendMessage({ conversationId, message: value });
    setMessageString('');
  };

  useEffect(() => {
    getConversation(conversationId);
  }, []);

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

  return (
    <Box position="relative" height="100%">
      <Box
        sx={{
          padding: '15px 20px',
          boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.2)',
          width: '-webkit-fill-available',
        }}
        position="absolute"
        top="0"
        display="flex"
        alignItems="center"
      >
        <Box>
          <Avatar src="https://chennaicorporation.gov.in/gcc/images/no-profile-pic-icon-24.jpg" />
        </Box>
        <Box padding="0 10px">{participantFullname(participant)}</Box>
      </Box>
      <Box
        position="absolute"
        sx={{ margin: '70px 0px 55px 0px', padding: '5px 0px' }}
        height="-webkit-fill-available"
        width="-webkit-fill-available"
        overflow="auto"
        display="flex"
        flexDirection="column-reverse"
      >
        {conversation.messages
          .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            // @ts-ignore
            return dateB - dateA;
          })
          .map((message, i) => (
            <Box key={message._id}>
              {(!conversation.messages[i + 1]?.createdAt ||
                _30MinDiff({
                  timeRaw: conversation.messages[i + 1]?.createdAt,
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
                  prevMessage={conversation.messages[i + 1]}
                  nextMessage={conversation.messages[i - 1]}
                  firstMessage={
                    !conversation.messages[i + 1]?.createdAt ||
                    _30MinDiff({
                      timeRaw: conversation.messages[i + 1]?.createdAt,
                      messageTimeRaw: message.createdAt,
                    })
                  }
                  lastMessage={
                    !conversation.messages[i - 1]?.createdAt ||
                    _30MinDiff({
                      timeRaw: conversation.messages[i - 1]?.createdAt,
                      messageTimeRaw: message.createdAt,
                    })
                  }
                />
              </Box>
            </Box>
          ))}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        display="flex"
        alignItems="center"
        sx={{ boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.2)' }}
      >
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
