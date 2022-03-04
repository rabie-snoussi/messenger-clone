import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { User } from 'shared/interfaces';
import locale from 'shared/locale.json';

interface UserProps {
  user: User;
  sendFriendRequest: Function;
  acceptFriendRequest: Function;
  deleteFriendRequest: Function;
  createConversation: Function;
  isSentRequest: boolean;
  isReceivedRequest: boolean;
  isFriend: boolean;
}

const UserItem: React.FC<UserProps> = ({
  user,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  createConversation,
  isSentRequest,
  isReceivedRequest,
  isFriend,
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
          {!isSentRequest && !isReceivedRequest && !isFriend && (
            <IconButton
              color="default"
              size="small"
              onClick={() => sendFriendRequest(user._id)}
            >
              <PersonAddRoundedIcon />
            </IconButton>
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

          {isReceivedRequest && (
            <Box display="flex">
              <DoneIcon
                fontSize="small"
                color="primary"
                onClick={() => acceptFriendRequest(user._id)}
                sx={{ cursor: 'pointer' }}
              />
              <CloseIcon
                fontSize="small"
                color="error"
                onClick={() => deleteFriendRequest(user._id)}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          )}

          {isFriend && (
            <Box>
              <IconButton
                color="primary"
                size="small"
                onClick={() => createConversation(user._id)}
              >
                <SendIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserItem;
