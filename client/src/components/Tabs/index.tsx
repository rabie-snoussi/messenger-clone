import React, { useState } from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Conversations, Users } from 'components';
import { getUsers as getUsersAction } from 'actions/user.action';
import { getFriends as getFriendsAction } from 'actions/friend.action';
import { getReceivedRequests as getReceivedRequestsAction } from 'actions/request.action';
import locale from 'shared/locale.json';
import { User } from 'shared/interfaces';

interface TabsProps {
  conversationId: string;
  users: User[];
  getUsers: Function;
  friends: User[];
  getFriends: Function;
  receivedRequests: User[];
  getReceivedRequests: Function;
}

interface ITABS {
  USERS: 'USERS';
  FRIENDS: 'FRIENDS';
  CONVERSATIONS: 'CONVERSATIONS';
  REQUESTS: 'REQUESTS';
}
const TABS: ITABS = {
  USERS: 'USERS',
  FRIENDS: 'FRIENDS',
  CONVERSATIONS: 'CONVERSATIONS',
  REQUESTS: 'REQUESTS',
};

export const Tabs: React.FC<TabsProps> = ({
  conversationId,
  getUsers,
  users,
  getFriends,
  friends,
  getReceivedRequests,
  receivedRequests,
}) => {
  const [selected, setSelected] = useState<
    'USERS' | 'CONVERSATIONS' | 'FRIENDS' | 'REQUESTS'
  >(TABS.CONVERSATIONS);

  const tabs = {
    USERS: {
      title: locale.users,
      component: <Users users={users} />,
    },
    FRIENDS: {
      title: locale.friends,
      component: <Users users={friends} />,
    },
    REQUESTS: {
      title: locale.requests,
      component: <Users users={receivedRequests} />,
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

  const onRequests = () => {
    getReceivedRequests();
    setSelected(TABS.REQUESTS);
  };

  return (
    <Box>
      <Box>
        <Button onClick={() => setSelected(TABS.CONVERSATIONS)}>
          {locale.conversations}
        </Button>
        <Button onClick={() => onUsers()}>{locale.users}</Button>
        <Button onClick={() => onFriends()}>{locale.friends}</Button>
        <Button onClick={() => onRequests()}>{locale.requests}</Button>
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

const mapStateToProps = (state: {
  users: User[];
  friends: User[];
  receivedRequests: User[];
}) => {
  const { users, friends, receivedRequests } = state;
  return { users, friends, receivedRequests };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getUsers: () => dispatch(getUsersAction()),
  getFriends: () => dispatch(getFriendsAction()),
  getReceivedRequests: () => dispatch(getReceivedRequestsAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
