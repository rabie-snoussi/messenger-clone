import { ACTIONS } from 'shared/constants';
import { FriendRequest, User } from 'shared/interfaces';

export const getSentRequests = () => ({
  type: ACTIONS.GET_SENT_REQUESTS,
});

export const setSentRequests = (payload: User[] | null) => ({
  type: ACTIONS.SET_SENT_REQUESTS,
  payload,
});

export const getReceivedRequests = () => ({
  type: ACTIONS.GET_RECEIVED_REQUESTS,
});

export const setReceivedRequests = (payload: User[] | null) => ({
  type: ACTIONS.SET_RECEIVED_REQUESTS,
  payload,
});

export const sendFriendRequest = (payload: FriendRequest) => ({
  type: ACTIONS.SEND_FRIEND_REQUEST,
  payload,
});
