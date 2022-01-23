import { ACTIONS } from 'shared/constants';
import { Conversation } from 'shared/interfaces';

interface ConversationsAction {
  type: string;
  payload?: Conversation[];
}

interface ConversationAction {
  type: string;
  payload?: Conversation;
}

export const conversations = (state = [], action: ConversationsAction) => {
  switch (action.type) {
    case ACTIONS.SET_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
};

export const conversation = (state = {}, action: ConversationAction) => {
  switch (action.type) {
    case ACTIONS.SET_CONVERSATION:
      return action.payload;
    default:
      return state;
  }
};
