import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';

import { User } from 'shared/interfaces';
import { getUsers as getUsersAction } from 'actions/user.action';
import UserItem from './UserItem';

interface UsersProps {
  users: User[];
  getUsers: Function;
  user: User;
}

const Users: React.FC<UsersProps> = ({ users, getUsers, user }) => {
  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(({ _id }) => _id !== user._id);

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      {filteredUsers.map((item: User) => (
        <UserItem key={item._id} user={item} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
