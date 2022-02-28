import { ACTIONS } from 'shared/constants';
import { User } from 'shared/interfaces';

interface FriendsAction {
  type: string;
  payload: User[];
}

export const friends = (state = [], action: FriendsAction) => {
  switch (action.type) {
    case ACTIONS.SET_FRIENDS:
      return action.payload;
    default:
      return state;
  }
};
