import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Message, User } from 'shared/interfaces';

interface BubbleProps {
  message: Message;
  prevMessage: Message;
  nextMessage: Message;
  loggedUser: User;
  firstMessage: boolean;
  lastMessage: boolean;
}

const Bubble: React.FC<BubbleProps> = ({
  message: { user, message },
  prevMessage,
  nextMessage,
  loggedUser,
  firstMessage,
  lastMessage,
}) => {
  const isOwner = !!(loggedUser._id === user._id);
  const isPrevSameOwner = !!(prevMessage?.user?._id === user._id);
  const isNextSameOwner = !!(nextMessage?.user?._id === user._id);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwner ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          background: isOwner ? '#0084ff' : '#e4e6eb',
          padding: '5px 10px',
          borderRadius: '999px',
          borderTopLeftRadius:
            !isOwner && isPrevSameOwner && !firstMessage ? '0px' : '18px',
          borderBottomLeftRadius:
            !isOwner && isNextSameOwner && !lastMessage ? '0px' : '18px',
          borderTopRightRadius:
            isOwner && isPrevSameOwner && !firstMessage ? '0px' : '18px',
          borderBottomRightRadius:
            isOwner && isNextSameOwner && !lastMessage ? '0px' : '18px',
        }}
      >
        <Typography
          sx={{
            color: isOwner ? '#fff' : '#000',
          }}
          variant="body2"
          component="div"
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Bubble;
