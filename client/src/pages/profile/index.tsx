import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';

import { User, UserUpdate } from 'shared/interfaces';
import { updateUser, deleteUser as deleteAction } from 'actions/user.action';
import locale from 'shared/locale.json';

interface Props {
  editUser: Function;
  user: User;
  deleteUser: Function;
}

const Profile: React.FC<Props> = ({ editUser, user, deleteUser }) => {
  const history = useHistory();

  const { register, handleSubmit } = useForm<UserUpdate>();

  const onSubmit = (data: UserUpdate) => {
    editUser({ userId: user._id, data });
  };

  const onDelete = (data: User) => {
    deleteUser(data);
  };

  return (
    <Box height="100%">
      <Tooltip arrow title={locale.goBack}>
        <IconButton
          color="primary"
          sx={{ position: 'absolute' }}
          onClick={() => history.goBack()}
        >
          <ArrowBackIcon sx={{ width: '50px', height: '50px' }} />
        </IconButton>
      </Tooltip>
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
                p: 2,
              }}
            >
              <FaceIcon sx={{ width: '100px', height: '100px' }} />
            </Box>
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

              <Box sx={{ padding: '10px 5px' }} onClick={() => onDelete(user)}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#F44E90',
                    textDecorationColor: '#F44E90',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {locale.deleteAccount}
                </Typography>
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
                  {locale.update}
                </Button>
              </Box>
            </form>
          </Box>
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
  editUser: ({ userId, data }: { userId: string; data: UserUpdate }) =>
    dispatch(updateUser({ userId, data })),
  deleteUser: (data: User) => dispatch(deleteAction(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
);
