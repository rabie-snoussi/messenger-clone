import axios from 'axios';
import { API } from 'shared/constants';
import { FriendRequest } from 'shared/interfaces';

export const fetchSentRequests = () => {
  const response = axios.get(`${API}/requests/sent`, {
    withCredentials: true,
  });

  return response;
};

export const fetchReceivedRequests = () => {
  const response = axios.get(`${API}/requests/received`, {
    withCredentials: true,
  });

  return response;
};

export const sendFriendRequest = (payload: FriendRequest) => {
  const response = axios.patch(`${API}/requests`, payload, {
    withCredentials: true,
  });

  return response;
};

export const acceptFriendRequest = ({ userId }: FriendRequest) => {
  const response = axios.patch(`${API}/requests/accept/${userId}`, null, {
    withCredentials: true,
  });

  return response;
};

export const deleteFriendRequest = ({ userId }: FriendRequest) => {
  const response = axios.delete(`${API}/requests/received/${userId}`, {
    withCredentials: true,
  });

  return response;
};
