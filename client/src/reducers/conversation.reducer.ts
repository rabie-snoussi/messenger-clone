import { ACTIONS } from 'shared/constants';
import { Conversation, Message } from 'shared/interfaces';

interface ConversationsAction {
  type: string;
  payload: Conversation[];
}

interface ConversationAction {
  type: string;
  payload: { conversation?: Conversation; message?: Message };
}

export const conversations = (state = [], action: ConversationsAction) => {
  switch (action.type) {
    case ACTIONS.RESET_CONVERSATIONS:
      return [];
    case ACTIONS.SET_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
};

export const conversation = (state = {}, action: ConversationAction) => {
  switch (action.type) {
    case ACTIONS.SET_CONVERSATION:
      return action.payload.conversation;
    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        // @ts-expect-error
        messages: [...state.messages, action.payload.message],
      };
    case ACTIONS.RESET_CONVERSATION:
      return {};
    default:
      return state;
  }
};
