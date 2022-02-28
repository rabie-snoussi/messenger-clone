import { ACTIONS } from 'shared/constants';
import { User } from 'shared/interfaces';

interface RequestsAction {
  type: string;
  payload: User[];
}

export const sentRequests = (state = [], action: RequestsAction) => {
  switch (action.type) {
    case ACTIONS.SET_SENT_REQUESTS:
      return action.payload;
    default:
      return state;
  }
};

export const receivedRequests = (state = [], action: RequestsAction) => {
  switch (action.type) {
    case ACTIONS.SET_RECEIVED_REQUESTS:
      return action.payload;
    default:
      return state;
  }
};
