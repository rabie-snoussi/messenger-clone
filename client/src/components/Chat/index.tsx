import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Conversation, User } from 'shared/interfaces';
import { getConversation as getConversationAction } from 'actions/conversation.action';
import Bubble from './Bubble';

interface ChatProps {
  conversationId: string;
  getConversation: Function;
  conversation: Conversation;
  user: User;
}

const Chat: React.FC<ChatProps> = ({
  conversationId,
  getConversation,
  conversation,
  user,
}) => {
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
    <>
      <Box
        sx={{ padding: '20px', boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.2)' }}
      >
        {participantFullname(participant)}
      </Box>
      <Box>
        {conversation.messages.map((message, i) => (
          <>
            {(!conversation.messages[i - 1]?.createdAt ||
              _30MinDiff({
                timeRaw: conversation.messages[i - 1]?.createdAt,
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
                prevMessage={conversation.messages[i - 1]}
                nextMessage={conversation.messages[i + 1]}
                firstMessage={
                  !conversation.messages[i - 1]?.createdAt ||
                  _30MinDiff({
                    timeRaw: conversation.messages[i - 1]?.createdAt,
                    messageTimeRaw: message.createdAt,
                  })
                }
                lastMessage={
                  !conversation.messages[i + 1]?.createdAt ||
                  _30MinDiff({
                    timeRaw: conversation.messages[i + 1]?.createdAt,
                    messageTimeRaw: message.createdAt,
                  })
                }
              />
            </Box>
          </>
        ))}
      </Box>
    </>
  );
};

const mapStateToProps = (state: { conversation: Conversation; user: User }) => {
  const { conversation, user } = state;
  return { conversation, user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getConversation: (conversationId: string) =>
    dispatch(getConversationAction(conversationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
