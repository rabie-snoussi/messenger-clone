import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { setUser, resetUser } from 'actions/user.action';
import {
  deleteUserRequest,
  getUserRequest,
  signInRequest,
  signOutRequest,
  signUpRequest,
  updateUserRequest,
} from 'services/user.service';
import { Credentials, UserCreation, UserUpdate, User } from 'shared/interfaces';
import { toast } from 'react-toastify';

interface SignIn {
  type: string;
  payload: Credentials;
}

interface SignUp {
  type: string;
  payload: UserCreation;
}

interface UpdateUser {
  type: string;
  payload: { userId: string; data: UserUpdate };
}

interface DeleteUser {
  type: string;
  payload: User;
}

export function* handleGetUser() {
  try {
    const response: ReturnType<typeof getUserRequest> = yield call(
      getUserRequest,
    );

    const user = get(response, 'data');
    yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
    yield put(resetUser());
  }
}

export function* handleSignIn({ payload }: SignIn) {
  try {
    const response: ReturnType<typeof signInRequest> = yield call(
      signInRequest,
      payload,
    );

    const user = get(response, 'data');
    yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
    yield put(resetUser());
  }
}

export function* handleSignOut() {
  try {
    yield call(signOutRequest);
    yield put(resetUser());
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleSignUp({ payload }: SignUp) {
  try {
    const response: ReturnType<typeof signUpRequest> = yield call(
      signUpRequest,
      payload,
    );

    const user = get(response, 'data');
    yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleUpdateUser({ payload }: UpdateUser) {
  try {
    const response: ReturnType<typeof updateUserRequest> = yield call(
      updateUserRequest,
      payload,
    );

    const user = get(response, 'data');

    yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleDeleteUser({ payload }: DeleteUser) {
  try {
    yield call(deleteUserRequest, payload);

    yield put(resetUser());
  } catch (e: any) {
    toast.error(e.message);
  }
}
