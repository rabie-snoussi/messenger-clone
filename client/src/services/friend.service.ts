import axios from 'axios';
import { API } from 'shared/constants';

export const fetchFriends = () => {
  const response = axios.get(`${API}/friends`, {
    withCredentials: true,
  });

  return response;
};
