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
  handleCreateConversation,
  handleSendMessage,
} from './conversation.middleware';
import {
  handleAcceptFriendRequest,
  handleDeleteFriendRequest,
  handleGetReceivedRequests,
  handleGetSentRequests,
  handleSendFriendRequest,
} from './request.middleware';
import { handleGetFriends } from './friend.middleware';

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

  yield takeLatest(ACTIONS.CREATE_CONVERSATION, handleCreateConversation);

  yield takeLatest(ACTIONS.GET_SENT_REQUESTS, handleGetSentRequests);

  yield takeLatest(ACTIONS.GET_RECEIVED_REQUESTS, handleGetReceivedRequests);

  yield takeLatest(ACTIONS.SEND_FRIEND_REQUEST, handleSendFriendRequest);

  yield takeLatest(ACTIONS.ACCEPT_FRIEND_REQUEST, handleAcceptFriendRequest);

  yield takeLatest(ACTIONS.DELETE_FRIEND_REQUEST, handleDeleteFriendRequest);

  yield takeLatest(ACTIONS.GET_FRIENDS, handleGetFriends);

  yield takeLatest(ACTIONS.SEND_MESSAGE, handleSendMessage);
}
