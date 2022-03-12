import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Box from '@mui/material/Box';

import socket from 'shared/socket';
import { Conversation, User } from 'shared/interfaces';
import {
  getConversations as getConversationsAction,
  setConversation as setConversationAction,
  setConversations as setConversationActions,
} from 'actions/conversation.action';

import ConversationItem from './ConversationItem';

interface ConversationsProps {
  conversations: Conversation[];
  getConversations: Function;
  user: User;
  conversationId: string;
  setConversation: Function;
  setConversations: Function;
}

const Conversations: React.FC<ConversationsProps> = ({
  conversations,
  getConversations,
  user,
  conversationId,
  setConversation,
  setConversations,
}) => {
  useEffect(() => {
    getConversations();
    socket.io?.on(`${user._id}/conversations`, (items) =>
      setConversations(items),
    );

    return () => {
      socket.io?.off(`${user._id}/conversations`);
    };
  }, []);

  if (isEmpty(conversations)) return <></>;

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
  setConversations: (conversations: Conversation[]) =>
    dispatch(setConversationActions(conversations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
