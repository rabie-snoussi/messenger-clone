import axios from 'axios';
import { API } from 'shared/constants';
import { CreateConversation } from 'shared/interfaces';

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

export const createConversation = (payload: CreateConversation) => {
  const response = axios.post(`${API}/conversations`, payload, {
    withCredentials: true,
  });

  return response;
};
