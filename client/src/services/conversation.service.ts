import axios from 'axios';
import { API } from 'shared/constants';

export const getConversationsResquest = () => {
  const response = axios.get(`${API}/conversations`, {
    withCredentials: true,
  });

  return response;
};

export const getConversationResquest = (conversationId: string) => {
  const response = axios.get(`${API}/conversations/${conversationId}`, {
    withCredentials: true,
  });

  return response;
};
