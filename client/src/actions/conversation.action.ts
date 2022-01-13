import { ACTIONS } from 'shared/constants';
import { Conversation } from 'shared/interfaces';

export const setConversations = (payload: Conversation[]) => ({
  type: ACTIONS.SET_CONVERSATIONS,
  payload,
});

export const getConversations = () => ({
  type: ACTIONS.GET_CONVERSATIONS,
});

export const setConversation = (payload: Conversation) => ({
  type: ACTIONS.SET_CONVERSATION,
  payload,
});

export const getConversation = (payload: string) => ({
  type: ACTIONS.GET_CONVERSATION,
  payload,
});
