import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { User, UserUpdate } from 'shared/interfaces';
import {
  updateUser,
  deleteUser as deleteAction,
  setUser as setAction,
} from 'actions/user.action';
import locale from 'shared/locale.json';

interface Props {
  editUser: Function;
  user: User;
  deleteUser: Function;
  setUser: Function;
}

const Profile: React.FC<Props> = ({ editUser, user, deleteUser, setUser }) => {
  const { register, handleSubmit } = useForm<UserUpdate>();

  const onSubmit = (data: UserUpdate) => {
    editUser({ userId: user._id, data });
  };

  const onDelete = (data: User) => {
    deleteUser(data);
    setUser(undefined);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          display: 'grid',
          maxWidth: '300px',
          padding: '30px 50px',
          flexGrow: 1,
        }}
        raised
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ padding: '10px 0' }}>
            <TextField
              label={locale.firstname}
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              defaultValue={user.firstname}
              {...register('firstname')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <TextField
              label={locale.lastname}
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              defaultValue={user.lastname}
              {...register('lastname')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <TextField
              label={locale.email}
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              defaultValue={user.email}
              {...register('email')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <TextField
              label={locale.password}
              type="password"
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              {...register('password')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <TextField
              type="password"
              label={locale.passwordConfirmation}
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              {...register('passwordConfirmation')}
            />
          </Box>

          <Box sx={{ padding: '5px 0' }}>
            <Button type="submit" sx={{ width: '100%' }} variant="contained">
              {locale.update}
            </Button>
          </Box>

          <Box sx={{ padding: '5px 0' }}>
            <Button
              sx={{
                width: '100%',
                background: 'red',
                '&:hover': { background: 'red' },
              }}
              variant="contained"
              onClick={() => onDelete(user)}
            >
              {locale.delete}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state: { user: User }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  editUser: ({ userId, data }: { userId: string; data: UserUpdate }) =>
    dispatch(updateUser({ userId, data })),
  deleteUser: (data: User) => dispatch(deleteAction(data)),
  setUser: (user: User | undefined) => dispatch(setAction(user)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
);
