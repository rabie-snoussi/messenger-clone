import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import Box from '@mui/material/Box';

import { Conversation, User } from 'shared/interfaces';
import {
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
}

const Conversations: React.FC<ConversationsProps> = ({
  conversations,
  getConversations,
  user,
  conversationId,
  setConversation,
}) => {
  useEffect(() => {
    getConversations();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
