import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { User } from 'shared/interfaces';

interface UserProps {
  user: User;
}

const UserItem: React.FC<UserProps> = ({ user }) => {
  const userFullname = (participants: User) =>
    `${participants.firstname} ${participants.lastname}`;

  return (
    <Box
      sx={{
        background: 'white',
        p: 1,
        '&:hover': { background: '#f5f5f5' },
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    >
      <Typography variant="body1" component="div">
        {userFullname(user)}
      </Typography>
    </Box>
  );
};

export default UserItem;
