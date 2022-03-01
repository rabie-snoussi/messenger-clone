import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import Grid from '@mui/material/Grid';

import { PATHS } from 'shared/constants';
import { Chat, Tabs } from 'components';
import { connect } from 'react-redux';
import { Conversation } from 'shared/interfaces';

interface MatchParams {
  conversationId: string;
}

interface HomeProps extends RouteComponentProps<MatchParams> {
  conversation: Conversation;
}

const Home: React.FC<HomeProps> = ({
  match: {
    params: { conversationId },
  },
  conversation,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (!isEmpty(conversation)) history.push(`${PATHS.CONVERSATION}/${conversation._id}`);
  }, [conversation]);
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={3}>
        <Tabs conversationId={conversationId} />
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
};

const mapStateToProps = (state: { conversation: Conversation }) => {
  const { conversation } = state;
  return { conversation };
};

export default connect(mapStateToProps, null)(Home);
