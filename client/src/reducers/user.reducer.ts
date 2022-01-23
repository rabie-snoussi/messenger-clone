import { ACTIONS } from 'shared/constants';
import { User } from 'shared/interfaces';

interface Action {
  type: string;
  payload?: User | null;
}

export default (state = {}, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return action.payload;
    default:
      return state;
  }
};
