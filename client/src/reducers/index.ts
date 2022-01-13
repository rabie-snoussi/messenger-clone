import { combineReducers } from 'redux';
import user from './user.reducer';
import { conversations, conversation } from './conversation.reducer';

export default combineReducers({
  user,
  conversations,
  conversation,
});
