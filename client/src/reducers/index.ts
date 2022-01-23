import { combineReducers } from 'redux';
import { user, users } from './user.reducer';
import { conversations, conversation } from './conversation.reducer';

export default combineReducers({
  user,
  users,
  conversations,
  conversation,
});
