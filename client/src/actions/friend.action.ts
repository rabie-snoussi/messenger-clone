import { ACTIONS } from 'shared/constants';
import { User } from 'shared/interfaces';

export const getFriends = () => ({
  type: ACTIONS.GET_FRIENDS,
});

export const setFriends = (payload: User[] | null) => ({
  type: ACTIONS.SET_FRIENDS,
  payload,
});
