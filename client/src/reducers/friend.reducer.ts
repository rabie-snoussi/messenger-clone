import { ACTIONS } from 'shared/constants';
import { User } from 'shared/interfaces';

interface FriendsAction {
  type: string;
  payload: User[];
}

export const friends = (state = [], action: FriendsAction) => {
  switch (action.type) {
    case ACTIONS.RESET_FRIENDS:
      return [];
    case ACTIONS.SET_FRIENDS:
      return action.payload;
    case ACTIONS.ADD_FRIEND:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
