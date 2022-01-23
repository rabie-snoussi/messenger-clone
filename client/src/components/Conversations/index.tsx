import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import Box from '@mui/material/Box';

import { Conversation, User } from 'shared/interfaces';
import { getConversations as getConversationsAction } from 'actions/conversation.action';
import ConversationItem from './ConversationItem';

interface ConversationsProps {
  conversations: Conversation[];
  getConversations: Function;
  user: User;
  conversationId: string;
}

const Conversations: React.FC<ConversationsProps> = ({
  conversations,
  getConversations,
  user,
  conversationId,
}) => {
  useEffect(() => {
    getConversations();
  }, []);

  console.log(conversations);

  if (isEmpty(conversations)) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      {conversations.map((conversation) => (
        <ConversationItem
          key={user._id}
          user={user}
          conversation={conversation}
          conversationId={conversationId}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
