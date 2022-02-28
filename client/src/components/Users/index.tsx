import React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';

import { User } from 'shared/interfaces';
import {
  sendFriendRequest as sendFriendRequestAction,
  acceptFriendRequest as acceptFriendRequestAction,
} from 'actions/request.action';
import UserItem from './UserItem';

interface UsersProps {
  users: User[];
  user: User;
  sendFriendRequest: Function;
  acceptFriendRequest: Function;
}

const Users: React.FC<UsersProps> = ({
  users,
  user,
  sendFriendRequest,
  acceptFriendRequest,
}) => {
  const filteredUsers = users.filter(({ _id }) => _id !== user._id);

  const isSentRequest = (userId: string) => user.requests.sent.includes(userId);
  const isReceivedRequest = (userId: string) =>
    user.requests.received.includes(userId);
  const isFriend = (userId: string) => user.friends.includes(userId);

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      {filteredUsers.map((item: User) => (
        <UserItem
          key={item._id}
          user={item}
          sendFriendRequest={sendFriendRequest}
          acceptFriendRequest={acceptFriendRequest}
          isSentRequest={isSentRequest(item._id)}
          isReceivedRequest={isReceivedRequest(item._id)}
          isFriend={isFriend(item._id)}
        />
      ))}
    </Box>
  );
};

const mapStateToProps = (state: { users: User[]; user: User }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  sendFriendRequest: (userId: string) =>
    dispatch(sendFriendRequestAction({ userId })),
  acceptFriendRequest: (userId: string) =>
    dispatch(acceptFriendRequestAction({ userId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
