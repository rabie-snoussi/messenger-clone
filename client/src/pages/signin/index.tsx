import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signIn } from 'actions/user.action';
import { PATHS } from 'shared/constants';
import isEmpty from 'lodash/isEmpty';
import { User, Credentials } from 'shared/interfaces';
import logo from 'assets/messenger_logo.svg';
import locale from 'shared/locale.json';

interface SigninProps extends RouteComponentProps {
  login: Function;
  user: User;
}

const Signin: React.FC<SigninProps> = ({ history, login, user }) => {
  const { register, handleSubmit } = useForm<Credentials>();

  const onSubmit = (credentials: Credentials) => {
    login(credentials);
  };

  if (!isEmpty(user)) history.push(PATHS.ROOT);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Box>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img width="75px" height="75px" src={logo} alt="logo" />
          </Box>
        </Box>

        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '45px 0',
          }}
        >
          <Typography sx={{ textAlign: 'center' }} variant="h4" component="h4">
            {locale.connectPeople}
          </Typography>
        </Box>

        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <form
            style={{ maxWidth: '320px', width: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={{ padding: '5px 0' }}>
              <TextField
                required
                label={locale.email}
                variant="outlined"
                size="small"
                fullWidth
                {...register('email')}
              />
            </Box>

            <Box sx={{ padding: '5px 0' }}>
              <TextField
                required
                label={locale.password}
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                {...register('password')}
              />
            </Box>

            <Box sx={{ padding: '10px 0' }}>
              <Link variant="caption" href={PATHS.SIGNUP}>
                {locale.noAccountSignUp}
              </Link>
            </Box>

            <Box
              sx={{
                padding: '15px 0 0 0',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{
                  borderRadius: '999px',
                  textTransform: 'none',
                  background: '#0A7CFF',
                  padding: '10px 20px',
                }}
                variant="contained"
                type="submit"
              >
                {locale.continue}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: { user: User }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  login: (data: Credentials) => dispatch(signIn(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
