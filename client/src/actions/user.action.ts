import { ACTIONS } from 'shared/constants';
import { User, Credentials, UserCreation, UserUpdate } from 'shared/interfaces';

export const setUser = (payload: User | null) => ({
  type: ACTIONS.SET_USER,
  payload,
});

export const getUser = () => ({
  type: ACTIONS.GET_USER,
});

export const signIn = (payload: Credentials) => ({
  type: ACTIONS.SIGN_IN,
  payload,
});

export const signOut = () => ({
  type: ACTIONS.SIGN_OUT,
});

export const signUp = (payload: UserCreation) => ({
  type: ACTIONS.SIGN_UP,
  payload,
});

export const updateUser = ({
  userId,
  data,
}: {
  userId: string;
  data: UserUpdate;
}) => ({
  type: ACTIONS.UPDATE_USER,
  payload: { userId, data },
});

export const deleteUser = (payload: User) => ({
  type: ACTIONS.DELETE_USER,
  payload,
});
