import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Conversation, User } from 'shared/interfaces';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';
import locale from 'shared/locale.json';

interface ConversationProps {
  conversation: Conversation;
  user: User;
  conversationId: string;
}

const ConversationItem: React.FC<ConversationProps> = ({
  conversation,
  user,
  conversationId,
}) => {
  const history = useHistory();
  const filterParticipants = (participants: User[]) =>
    participants.filter((participant) => participant._id !== user._id);

  const participantFullname = (participants: User) =>
    `${participants.firstname} ${participants.lastname}`;

  const onClick = (id: string) => {
    history.push(`${PATHS.CONVERSATION}/${id}`);
  };

  return (
    <Box
      sx={{
        background: conversationId === conversation._id ? '#f5f5f5' : 'white',
        p: 1,
        '&:hover': { background: '#f5f5f5' },
        borderRadius: '8px',
        cursor: 'pointer',
      }}
      onClick={() => onClick(conversation._id)}
    >
      <Typography variant="body1" component="div">
        {participantFullname(filterParticipants(conversation.participants)[0])}
      </Typography>
      <Typography variant="caption" component="div">
        {`${
          conversation.messages[conversation.messages.length - 1].user._id ===
          user._id
            ? `${locale.you} : `
            : ''
        }${conversation.messages[conversation.messages.length - 1].message}`}
      </Typography>
    </Box>
  );
};

export default ConversationItem;
