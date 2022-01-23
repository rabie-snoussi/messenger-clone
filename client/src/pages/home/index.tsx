import React from 'react';
import { RouteComponentProps } from 'react-router';

import Grid from '@mui/material/Grid';

import { Chat, Conversations } from 'components';

interface MatchParams {
  conversationId: string;
}

interface HomeProps extends RouteComponentProps<MatchParams> {}

const Home: React.FC<HomeProps> = ({
  match: {
    params: { conversationId },
  },
}) => (
  <Grid container sx={{ height: '100%' }}>
    <Grid item xs={3}>
      <Conversations conversationId={conversationId} />
    </Grid>
    <Grid
      item
      xs={9}
      sx={{
        borderRight: '1px solid #cfcfcf',
        borderLeft: '1px solid #cfcfcf',
      }}
    >
      {conversationId && <Chat conversationId={conversationId} />}
    </Grid>
  </Grid>
);

export default Home;
