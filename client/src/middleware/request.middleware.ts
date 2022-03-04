import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { addFriend, removeReceivedRequest, setReceivedRequests, setSentRequests } from 'actions/request.action';
import {
  acceptFriendRequest,
  deleteFriendRequest,
  fetchReceivedRequests,
  fetchSentRequests,
  sendFriendRequest,
} from 'services/request.service';
import { FriendRequest } from 'shared/interfaces';
import { setUser } from 'actions/user.action';

interface IFriendRequest {
  type: string;
  payload: FriendRequest;
}

export function* handleGetSentRequests() {
  try {
    const response: ReturnType<typeof fetchSentRequests> = yield call(
      fetchSentRequests,
    );

    const sentRequests = get(response, 'data');
    if (!isEmpty(sentRequests)) yield put(setReceivedRequests(sentRequests));
    else yield put(setSentRequests(sentRequests));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleGetReceivedRequests() {
  try {
    const response: ReturnType<typeof fetchReceivedRequests> = yield call(
      fetchReceivedRequests,
    );

    const receivedRequests = get(response, 'data');
    if (!isEmpty(receivedRequests)) yield put(setReceivedRequests(receivedRequests));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleSendFriendRequest({ payload }: IFriendRequest) {
  try {
    const response: ReturnType<typeof sendFriendRequest> = yield call(
      sendFriendRequest,
      payload,
    );

    const user = get(response, 'data');
    if (!isEmpty(user)) yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleAcceptFriendRequest({ payload }: IFriendRequest) {
  try {
    const response: ReturnType<typeof acceptFriendRequest> = yield call(
      acceptFriendRequest,
      payload,
    );

    const data = get(response, 'data');
    if (!isEmpty(data)) {
      yield put(removeReceivedRequest([data.accepted]));
      yield put(addFriend([data.accepted]));
      yield put(setUser(data.user));
    }
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleDeleteFriendRequest({ payload }: IFriendRequest) {
  try {
    const response: ReturnType<typeof deleteFriendRequest> = yield call(
      deleteFriendRequest,
      payload,
    );

    const data = get(response, 'data');
    if (!isEmpty(data)) {
      yield put(removeReceivedRequest([data.deleted]));
      yield put(setUser(data.user));
    }
  } catch (e: any) {
    toast.error(e.message);
  }
}
