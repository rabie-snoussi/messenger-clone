import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import socket from 'shared/socket';
import Box from '@mui/material/Box';

import { Conversation, Message, User } from 'shared/interfaces';
import {
  addMessage as addMessageAction,
  getConversations as getConversationsAction,
  setConversation as setConversationAction,
} from 'actions/conversation.action';
import ConversationItem from './ConversationItem';

interface ConversationsProps {
  conversations: Conversation[];
  getConversations: Function;
  user: User;
  conversationId: string;
  setConversation: Function;
  addMessage: Function;
}

const Conversations: React.FC<ConversationsProps> = ({
  conversations,
  getConversations,
  user,
  conversationId,
  setConversation,
  addMessage,
}) => {
  useEffect(() => {
    getConversations();
    socket.io?.on(conversationId, (message) => addMessage(message));
  }, []);

  if (isNull(conversations)) return <></>;
  if (isEmpty(conversations)) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          user={user}
          conversation={conversation}
          conversationId={conversationId}
          setConversation={setConversation}
        />
      ))}
    </Box>
  );
};

const mapStateToProps = (state: {
  conversations: Conversation[];
  user: User;
}) => {
  const { conversations, user } = state;
  return { conversations, user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getConversations: () => dispatch(getConversationsAction()),
  setConversation: (conversation: Conversation) =>
    dispatch(setConversationAction({ conversation })),
  addMessage: (message: Message) => dispatch(addMessageAction({ message })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
