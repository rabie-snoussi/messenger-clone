import { takeLatest } from 'redux-saga/effects';
import { ACTIONS } from 'shared/constants';
import {
  handleDeleteUser,
  handleGetUser,
  handleSignIn,
  handleSignOut,
  handleSignUp,
  handleUpdateUser,
} from './user.middleware';

export function* watcherSaga() {
  yield takeLatest(ACTIONS.GET_USER, handleGetUser);

  yield takeLatest(ACTIONS.UPDATE_USER, handleUpdateUser);

  yield takeLatest(ACTIONS.DELETE_USER, handleDeleteUser);

  yield takeLatest(ACTIONS.SIGN_IN, handleSignIn);

  yield takeLatest(ACTIONS.SIGN_OUT, handleSignOut);

  yield takeLatest(ACTIONS.SIGN_UP, handleSignUp);
}
