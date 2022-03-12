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

export const acceptFriendRequest = (payload: FriendRequest) => ({
  type: ACTIONS.ACCEPT_FRIEND_REQUEST,
  payload,
});

export const deleteFriendRequest = (payload: FriendRequest) => ({
  type: ACTIONS.DELETE_FRIEND_REQUEST,
  payload,
});

export const removeReceivedRequest = (payload: [User]) => ({
  type: ACTIONS.REMOVE_RECEIVED_REQUEST,
  payload,
});

export const addFriend = (payload: [User]) => ({
  type: ACTIONS.ADD_FRIEND,
  payload,
});

export const resetReceivedRequests = () => ({
  type: ACTIONS.RESET_RECEIVED_REQUESTS,
});
