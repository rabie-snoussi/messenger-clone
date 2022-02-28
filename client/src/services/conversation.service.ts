import axios from 'axios';
import { API } from 'shared/constants';

export const fetchConversations = () => {
  const response = axios.get(`${API}/conversations`, {
    withCredentials: true,
  });

  return response;
};

export const fetchConversation = (conversationId: string) => {
  const response = axios.get(`${API}/conversations/${conversationId}`, {
    withCredentials: true,
  });

  return response;
};
