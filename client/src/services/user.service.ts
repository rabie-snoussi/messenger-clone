import axios from 'axios';
import { Credentials, UserCreation, UserUpdate, User } from 'shared/interfaces';
import { API } from 'shared/constants';
import locale from 'shared/locale.json';
import { toastify } from './helper';

export const fetchUser = () => {
  const response = axios.get(`${API}/user`, {
    withCredentials: true,
  });

  return response;
};

export const fetchUsers = () => {
  const response = axios.get(`${API}/users`, {
    withCredentials: true,
  });

  return response;
};

export const signIn = (payload: Credentials) => {
  const response = axios.post(`${API}/auth`, payload, {
    withCredentials: true,
  });

  toastify({ axiosPromise: response, successMessage: locale.welcome });

  return response;
};

export const signUp = (payload: UserCreation) => {
  const response = axios.post(`${API}/users`, payload, {
    withCredentials: true,
  });

  toastify({ axiosPromise: response, successMessage: locale.welcome });

  return response;
};

export const signOut = () => {
  const response = axios.delete(`${API}/auth`, {
    withCredentials: true,
  });

  return response;
};

export const updateUser = ({
  userId,
  data,
}: {
  userId: string;
  data: UserUpdate;
}) => {
  const response = axios.patch(`${API}/users/${userId}`, data, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.userUpdateSuccess,
  });

  return response;
};

export const deleteUser = (payload: User) => {
  const response = axios.delete(`${API}/users/${payload._id}`, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.userDeletionSuccess,
  });

  return response;
};
