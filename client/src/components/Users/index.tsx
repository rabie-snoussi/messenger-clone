import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';

import { User } from 'shared/interfaces';
import { getUsers as getUsersAction } from 'actions/user.action';
import { sendFriendRequest as sendFriendRequestAction } from 'actions/request.action';
import UserItem from './UserItem';

interface UsersProps {
  users: User[];
  getUsers: Function;
  user: User;
  sendFriendRequest: Function;
}

const Users: React.FC<UsersProps> = ({
  users,
  getUsers,
  user,
  sendFriendRequest,
}) => {
  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(({ _id }) => _id !== user._id);

  const isSentRequest = (userId: string) => user.requests.sent.includes(userId);

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
          isSentRequest={isSentRequest(item._id)}
        />
      ))}
    </Box>
  );
};

const mapStateToProps = (state: { users: User[]; user: User }) => {
  const { users, user } = state;
  return { users, user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getUsers: () => dispatch(getUsersAction()),
  sendFriendRequest: (userId: string) =>
    dispatch(sendFriendRequestAction({ userId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
