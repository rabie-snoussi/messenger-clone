import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { setReceivedRequests, setSentRequests } from 'actions/request.action';
import {
  acceptFriendRequest,
  fetchReceivedRequests,
  fetchSentRequests,
  sendFriendRequest,
} from 'services/request.service';
import { FriendRequest } from 'shared/interfaces';
import { setUser } from 'actions/user.action';

interface SendFriendRequest {
  type: string;
  payload: FriendRequest;
}

interface AcceptFriendRequest {
  type: string;
  payload: FriendRequest;
}

export function* handleGetSentRequests() {
  try {
    const response: ReturnType<typeof fetchSentRequests> = yield call(
      fetchSentRequests,
    );

    const sentRequests = get(response, 'data');
    if (isEmpty(sentRequests)) yield put(setSentRequests(null));
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
    if (isEmpty(receivedRequests)) yield put(setReceivedRequests(null));
    else yield put(setReceivedRequests(receivedRequests));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleSendFriendRequest({ payload }: SendFriendRequest) {
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

export function* handleAcceptFriendRequest({ payload }: AcceptFriendRequest) {
  try {
    const response: ReturnType<typeof acceptFriendRequest> = yield call(
      acceptFriendRequest,
      payload,
    );

    const user = get(response, 'data');
    if (!isEmpty(user)) yield put(setUser(user));
  } catch (e: any) {
    toast.error(e.message);
  }
}
