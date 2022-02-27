import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

import { User } from 'shared/interfaces';

interface UserProps {
  user: User;
  sendFriendRequest: Function;
}

const UserItem: React.FC<UserProps> = ({ user, sendFriendRequest }) => {
  const userFullname = (participants: User) =>
    `${participants.firstname} ${participants.lastname}`;

  return (
    <Box
      sx={{
        background: 'white',
        p: 1,
        borderRadius: '8px',
        display: 'flex',
      }}
    >
      <Box sx={{ p: 1 }}>
        <Avatar src="https://chennaicorporation.gov.in/gcc/images/no-profile-pic-icon-24.jpg" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography variant="body1" component="div">
          {userFullname(user)}
        </Typography>
        <Box
          sx={{
            background: 'white',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.40)',
            },
          }}
        >
          <PersonAddRoundedIcon
            sx={{ color: 'black', fontSize: '20px' }}
            onClick={() => sendFriendRequest(user._id)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserItem;
