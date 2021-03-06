import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { setUser, setUsers } from 'actions/user.action';
import {
  deleteUser,
  fetchUser,
  fetchUsers,
  signIn,
  signOut,
  signUp,
  updateUser,
} from 'services/user.service';
import { Credentials, UserCreation, UserUpdate, User } from 'shared/interfaces';
import { toast } from 'react-toastify';
import {
  resetConversation,
  resetConversations,
} from 'actions/conversation.action';
import { resetFriends } from 'actions/friend.action';
import { resetReceivedRequests } from 'actions/request.action';

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
    const response: ReturnType<typeof fetchUser> = yield call(fetchUser);

    const user = get(response, 'data');
    yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
    yield put(setUser(null));
  }
}

export function* handleGetUsers() {
  try {
    const response: ReturnType<typeof fetchUsers> = yield call(fetchUsers);

    const users = get(response, 'data');
    yield put(setUsers(users));
  } catch (e: any) {
    toast.error(e.message);
    yield put(setUsers(null));
  }
}

export function* handleSignIn({ payload }: SignIn) {
  try {
    const response: ReturnType<typeof signIn> = yield call(signIn, payload);

    const user = get(response, 'data');
    yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
    yield put(setUser(null));
  }
}

export function* handleSignOut() {
  try {
    const response: ReturnType<typeof signOut> = yield call(signOut);

    const statusCode = get(response, 'status');

    if (statusCode === 200) {
      yield put(setUser(null));
      yield put(resetConversation());
      yield put(resetConversations());
      yield put(resetFriends());
      yield put(resetReceivedRequests());
    }
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleSignUp({ payload }: SignUp) {
  try {
    const response: ReturnType<typeof signUp> = yield call(signUp, payload);

    const user = get(response, 'data');
    yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleUpdateUser({ payload }: UpdateUser) {
  try {
    const response: ReturnType<typeof updateUser> = yield call(
      updateUser,
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
    const response: ReturnType<typeof deleteUser> = yield call(
      deleteUser,
      payload,
    );

    const statusCode = get(response, 'status');

    if (statusCode === 200) yield put(setUser(null));
  } catch (e: any) {
    toast.error(e.message);
  }
}
