import { ACTIONS } from 'shared/constants';
import { Conversation, CreateConversation, Message, SendMessage } from 'shared/interfaces';

export const setConversations = (payload: Conversation[] | null) => ({
  type: ACTIONS.SET_CONVERSATIONS,
  payload,
});

export const getConversations = () => ({
  type: ACTIONS.GET_CONVERSATIONS,
});

export const setConversation = (payload: { conversation: Conversation}) => ({
  type: ACTIONS.SET_CONVERSATION,
  payload,
});

export const getConversation = (payload: string) => ({
  type: ACTIONS.GET_CONVERSATION,
  payload,
});

export const createConversation = (payload: CreateConversation) => ({
  type: ACTIONS.CREATE_CONVERSATION,
  payload,
});

export const sendMessage = (payload: SendMessage) => ({
  type: ACTIONS.SEND_MESSAGE,
  payload,
});

export const addMessage = (payload: { message: Message}) => ({
  type: ACTIONS.ADD_MESSAGE,
  payload,
});
