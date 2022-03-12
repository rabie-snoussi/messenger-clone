import { useEffect, ReactChild } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { PATHS } from 'shared/constants';
import { withRouter, RouteComponentProps } from 'react-router';
import { getUser } from 'actions/user.action';
import { User } from 'shared/interfaces';
import socket from 'shared/socket';

interface PrivateRoutesProps extends RouteComponentProps {
  children: ReactChild | ReactChild[];
  fetchUser: Function;
  user: User | null;
}

const PrivateRoutes = ({
  children,
  history,
  fetchUser,
  user,
}: PrivateRoutesProps) => {
  useEffect(() => {
    fetchUser();

    socket.connect();

    return () => {
      socket.io?.disconnect();
    };
  }, []);

  if (user === null) history.push(PATHS.SIGNIN);

  if (isEmpty(user)) return <div>Loading...</div>;

  return <>{children}</>;
};

const mapStateToProps = (state: { user: User }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUser: () => dispatch(getUser()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes),
);
