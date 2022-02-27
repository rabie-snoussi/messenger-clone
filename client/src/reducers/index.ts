import { combineReducers } from 'redux';
import { user, users } from './user.reducer';
import { conversations, conversation } from './conversation.reducer';
import { sentRequests, receivedRequests } from './request.reducer';

export default combineReducers({
  user,
  users,
  conversations,
  conversation,
  sentRequests,
  receivedRequests,
});
