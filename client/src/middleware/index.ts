import { takeLatest } from 'redux-saga/effects';
import { ACTIONS } from 'shared/constants';
import {
  handleDeleteUser,
  handleGetUser,
  handleGetUsers,
  handleSignIn,
  handleSignOut,
  handleSignUp,
  handleUpdateUser,
} from './user.middleware';
import {
  handleGetConversations,
  handleGetConversation,
} from './conversation.middleware';
import { handleGetReceivedRequests, handleGetSentRequests, handleSendFriendRequest } from './request.middleware';

export function* watcherSaga() {
  yield takeLatest(ACTIONS.GET_USER, handleGetUser);

  yield takeLatest(ACTIONS.GET_USERS, handleGetUsers);

  yield takeLatest(ACTIONS.UPDATE_USER, handleUpdateUser);

  yield takeLatest(ACTIONS.DELETE_USER, handleDeleteUser);

  yield takeLatest(ACTIONS.SIGN_IN, handleSignIn);

  yield takeLatest(ACTIONS.SIGN_OUT, handleSignOut);

  yield takeLatest(ACTIONS.SIGN_UP, handleSignUp);

  yield takeLatest(ACTIONS.GET_CONVERSATIONS, handleGetConversations);

  yield takeLatest(ACTIONS.GET_CONVERSATION, handleGetConversation);

  yield takeLatest(ACTIONS.GET_SENT_REQUESTS, handleGetSentRequests);

  yield takeLatest(ACTIONS.GET_RECEIVED_REQUESTS, handleGetReceivedRequests);

  yield takeLatest(ACTIONS.SEND_FRIEND_REQUEST, handleSendFriendRequest);
}
