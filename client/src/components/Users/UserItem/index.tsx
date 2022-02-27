import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

import { User } from 'shared/interfaces';
import locale from 'shared/locale.json';

interface UserProps {
  user: User;
  sendFriendRequest: Function;
  isSentRequest: boolean;
}

const UserItem: React.FC<UserProps> = ({
  user,
  sendFriendRequest,
  isSentRequest,
}) => {
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
        <Box>
          {!isSentRequest && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
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
          )}

          {isSentRequest && (
            <Box
              sx={{
                padding: '0px 5px',
                background: '#F5F5F5',
                borderRadius: '4px',
                border: '1px solid #d3d3d3',
              }}
            >
              <Typography variant="caption" component="div">
                {locale.invitationSent}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserItem;
