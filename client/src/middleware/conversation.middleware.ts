import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import {
  setConversations,
  setConversation,
  addMessage,
} from 'actions/conversation.action';
import {
  fetchConversations,
  fetchConversation,
  createConversation,
  sendMessage,
} from 'services/conversation.service';
import { Conversation, Message } from 'shared/interfaces';

interface GetConversation {
  type: string;
  payload: string;
}

interface CreateConversation {
  type: string;
  payload: {
    participant: string;
  };
}

interface SendMessage {
  type: string;
  payload: {
    message: string;
    conversationId: string;
  };
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

    const conversation: Conversation = get(response, 'data');
    yield put(setConversation({ conversation }));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleCreateConversation({ payload }: CreateConversation) {
  try {
    const response: ReturnType<typeof createConversation> = yield call(
      createConversation,
      payload,
    );

    const conversation: Conversation = get(response, 'data');
    yield put(setConversation({ conversation }));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleSendMessage({ payload }: SendMessage) {
  try {
    const response: ReturnType<typeof sendMessage> = yield call(
      sendMessage,
      payload,
    );

    const message: Message = get(response, 'data');
    yield put(addMessage({ message }));
  } catch (e: any) {
    toast.error(e.message);
  }
}
