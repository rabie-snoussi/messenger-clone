import React, { useState } from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Conversations, Users } from 'components';
import { getUsers as getUsersAction } from 'actions/user.action';
import { getFriends as getFriendsAction } from 'actions/friend.action';
import locale from 'shared/locale.json';
import { User } from 'shared/interfaces';

interface TabsProps {
  conversationId: string;
  users: User[];
  getUsers: Function;
  friends: User[];
  getFriends: Function;
}

interface ITABS {
  USERS: 'USERS';
  FRIENDS: 'FRIENDS';
  CONVERSATIONS: 'CONVERSATIONS';
}
const TABS: ITABS = {
  USERS: 'USERS',
  FRIENDS: 'FRIENDS',
  CONVERSATIONS: 'CONVERSATIONS',
};

export const Tabs: React.FC<TabsProps> = ({
  conversationId,
  getUsers,
  users,
  getFriends,
  friends,
}) => {
  const [selected, setSelected] = useState<
    'USERS' | 'CONVERSATIONS' | 'FRIENDS'
  >(TABS.CONVERSATIONS);

  const tabs = {
    USERS: {
      title: locale.users,
      component: <Users users={users} />,
    },
    FRIENDS: {
      title: locale.conversations,
      component: <Users users={friends} />,
    },
    CONVERSATIONS: {
      title: locale.conversations,
      component: <Conversations conversationId={conversationId} />,
    },
  };

  const onUsers = () => {
    getUsers();
    setSelected(TABS.USERS);
  };

  const onFriends = () => {
    getFriends();
    setSelected(TABS.FRIENDS);
  };

  return (
    <Box>
      <Box>
        <Button onClick={() => setSelected(TABS.CONVERSATIONS)}>
          {locale.conversations}
        </Button>
        <Button onClick={() => onUsers()}>{locale.users}</Button>
        <Button onClick={() => onFriends()}>{locale.friends}</Button>
      </Box>
      <Box>
        <Typography variant="body1" component="div">
          {tabs[selected].title}
        </Typography>
      </Box>
      <Box>{tabs[selected].component}</Box>
    </Box>
  );
};

const mapStateToProps = (state: { users: User[]; friends: User[] }) => {
  const { users, friends } = state;
  return { users, friends };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getUsers: () => dispatch(getUsersAction()),
  getFriends: () => dispatch(getFriendsAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
