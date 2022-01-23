import { ACTIONS } from 'shared/constants';
import { User } from 'shared/interfaces';

interface Action {
  type: string;
  payload?: User | null;
}

export const user = (state = {}, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export const users = (state = [], action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return action.payload;
    default:
      return state;
  }
};
