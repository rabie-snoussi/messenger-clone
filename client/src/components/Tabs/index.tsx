import React, { useState } from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Conversations, Users } from 'components';
import locale from 'shared/locale.json';

interface TabsProps {
  conversationId: string;
}

interface ITABS {
  USERS: 'USERS';
  CONVERSATIONS: 'CONVERSATIONS';
}
const TABS: ITABS = {
  USERS: 'USERS',
  CONVERSATIONS: 'CONVERSATIONS',
};

export const Tabs: React.FC<TabsProps> = ({ conversationId }) => {
  const [selected, setSelected] = useState<'USERS' | 'CONVERSATIONS'>(
    TABS.USERS,
  );

  const tabs = {
    USERS: {
      title: locale.users,
      component: <Users />,
    },
    CONVERSATIONS: {
      title: locale.conversations,
      component: <Conversations conversationId={conversationId} />,
    },
  };

  return (
    <Box>
      <Box>
        <Button onClick={() => setSelected(TABS.CONVERSATIONS)}>
          {locale.conversations}
        </Button>
        <Button onClick={() => setSelected(TABS.USERS)}>{locale.users}</Button>
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

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Tabs);
