import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';

import { Conversation, User } from 'shared/interfaces';
import { PATHS } from 'shared/constants';
import socket from 'shared/socket';
import locale from 'shared/locale.json';

interface ConversationProps {
  conversation: Conversation;
  user: User;
  conversationId: string;
  setConversation: Function;
}

const ConversationItem: React.FC<ConversationProps> = ({
  conversation,
  user,
  conversationId,
  setConversation,
}) => {
  const history = useHistory();
  const [typingUsers, setTypingUsers] = useState<User[] | []>([]);

  const filteredTypingUsers = (): User[] =>
    typingUsers.filter((item) => item._id !== user._id);

  const filterParticipants = (participants: User[]) =>
    participants.filter((participant) => participant._id !== user._id);

  const participantFullname = (participants: User) =>
    `${participants.firstname} ${participants.lastname}`;

  const onClick = (id: string) => {
    setConversation(conversation);
    history.push(`${PATHS.CONVERSATION}/${id}`);
  };

  useEffect(() => {
    socket.io?.on(`${conversation._id}/typing`, (users) =>
      setTypingUsers(users),
    );

    return () => {
      socket.io?.off(`${conversation._id}/typing`);
    };
  }, []);

  return (
    <Box
      sx={{
        background: conversationId === conversation._id ? '#f5f5f5' : 'white',
        p: 1,
        '&:hover': { background: '#f5f5f5' },
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={() => onClick(conversation._id)}
    >
      <Box sx={{ p: 1 }}>
        <FaceIcon sx={{ height: '50px', width: '50px' }} />
      </Box>

      <Box width="100%">
        <Typography variant="body1" component="div">
          {participantFullname(
            filterParticipants(conversation.participants)[0],
          )}
        </Typography>

        <Typography
          variant="caption"
          component="div"
          width="calc(100% - 70px)"
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {!isEmpty(filteredTypingUsers()) ? (
            `${String(
              ...filteredTypingUsers().map((item) => item.firstname),
            )} ${locale.typing}...`
          ) : !isEmpty(conversation.messages) ? (
            <>
              {`${
                conversation.messages[conversation.messages.length - 1].user
                  ._id === user._id
                  ? `${locale.you} : `
                  : ''
              }${
                conversation.messages[conversation.messages.length - 1].message
              }`}
            </>
          ) : (
            locale.sayHello
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ConversationItem;
