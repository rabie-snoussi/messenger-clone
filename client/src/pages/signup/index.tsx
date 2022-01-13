import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router';
import { UserCreation, User } from 'shared/interfaces';
import { signUp } from 'actions/user.action';
import { PATHS } from 'shared/constants';
import logo from 'assets/messenger_logo.svg';
import locale from 'shared/locale.json';

interface SignUpProps extends RouteComponentProps {
  createUser: Function;
  user: User;
}

const Signup: React.FC<SignUpProps> = ({ createUser, history, user }) => {
  const { register, handleSubmit } = useForm<UserCreation>();

  const onSubmit = (data: UserCreation) => {
    createUser(data);
  };

  if (!isEmpty(user)) history.push(PATHS.HOME);

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

        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ padding: '5px 0', display: 'flex', width: '100%' }}>
              <Box sx={{ padding: '0 5px', flexGrow: 1 }}>
                <TextField
                  label={locale.firstname}
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={user.firstname}
                  {...register('firstname')}
                />
              </Box>

              <Box sx={{ padding: '0 5px', flexGrow: 1 }}>
                <TextField
                  label={locale.lastname}
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={user.lastname}
                  {...register('lastname')}
                />
              </Box>
            </Box>

            <Box sx={{ padding: '5px' }}>
              <TextField
                label={locale.email}
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={user.email}
                {...register('email')}
              />
            </Box>

            <Box sx={{ padding: '5px' }}>
              <TextField
                label={locale.password}
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                {...register('password')}
              />
            </Box>

            <Box sx={{ padding: '5px' }}>
              <TextField
                type="password"
                label={locale.passwordConfirmation}
                variant="outlined"
                size="small"
                fullWidth
                {...register('passwordConfirmation')}
              />
            </Box>

            <Box sx={{ padding: '10px 5px' }}>
              <Link
                variant="caption"
                sx={{ color: '#F44E90', textDecorationColor: '#F44E90' }}
                href={PATHS.SIGNIN}
              >
                {locale.hasAccount}
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
                  background: '#F44E90',
                  padding: '10px 20px',
                  '&:hover': {
                    background: '#F44E90',
                  },
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
  createUser: (data: UserCreation) => dispatch(signUp(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
