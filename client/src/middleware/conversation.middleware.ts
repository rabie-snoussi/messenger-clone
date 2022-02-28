import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { setConversations, setConversation } from 'actions/conversation.action';
import {
  fetchConversations,
  fetchConversation,
} from 'services/conversation.service';

interface GetConversation {
  type: string;
  payload: string;
}

export function* handleGetConversations() {
  try {
    const response: ReturnType<typeof fetchConversations> = yield call(
      fetchConversations,
    );

    const conversations = get(response, 'data');
    if (isEmpty(conversations)) yield put(setConversations(null));
    else yield put(setConversations(conversations));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleGetConversation({ payload }: GetConversation) {
  try {
    const response: ReturnType<typeof fetchConversation> = yield call(
      fetchConversation,
      payload,
    );

    const conversation = get(response, 'data');
    yield put(setConversation(conversation));
  } catch (e: any) {
    toast.error(e.message);
  }
}
