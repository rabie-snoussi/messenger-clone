import axios from 'axios';
import { API } from 'shared/constants';
import { FriendRequest } from 'shared/interfaces';

export const getSentRequests = () => {
  const response = axios.get(`${API}/requests/sent`, {
    withCredentials: true,
  });

  return response;
};

export const getReceivedRequests = () => {
  const response = axios.get(`${API}/api/requests/received`, {
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
