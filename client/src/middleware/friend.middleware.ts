import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { fetchFriends } from 'services/friend.service';
import { setFriends } from 'actions/friend.action';

export function* handleGetFriends() {
  try {
    const response: ReturnType<typeof fetchFriends> = yield call(
      fetchFriends,
    );

    const friends = get(response, 'data');
    if (!isEmpty(friends)) yield put(setFriends(friends));
  } catch (e: any) {
    toast.error(e.message);
  }
}
