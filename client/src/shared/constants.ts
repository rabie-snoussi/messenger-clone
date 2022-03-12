export const PATHS = {
  ROOT: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  HOME: '/home',
  PROFILE: '/profile',
  ERROR: '/error',
  CONVERSATION: '/conversation',
};

export const API = process.env.REACT_APP_API;

export const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const ACTIONS = {
  GET_USER: 'GET_USER',
  SET_USER: 'SET_USER',
  GET_USERS: 'GET_USERS',
  SET_USERS: 'SET_USERS',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  GET_CONVERSATIONS: 'GET_CONVERSATIONS',
  CREATE_CONVERSATION: 'CREATE_CONVERSATION',
  SET_CONVERSATION: 'SET_CONVERSATION',
  GET_CONVERSATION: 'GET_CONVERSATION',
  SEND_FRIEND_REQUEST: 'ADD_FRIEND_REQUEST',
  ACCEPT_FRIEND_REQUEST: 'ACCEPT_FRIEND_REQUEST',
  DELETE_FRIEND_REQUEST: 'DELETE_FRIEND_REQUEST',
  GET_SENT_REQUESTS: 'GET_SENT_REQUESTS',
  SET_SENT_REQUESTS: 'SET_SENT_REQUESTS',
  GET_RECEIVED_REQUESTS: 'GET_RECEIVED_REQUESTS',
  SET_RECEIVED_REQUESTS: 'SET_RECEIVED_REQUESTS',
  REMOVE_RECEIVED_REQUEST: 'REMOVE_RECEIVED_REQUEST',
  GET_FRIENDS: 'GET_FRIENDS',
  SET_FRIENDS: 'SET_FRIENDS',
  ADD_FRIEND: 'ADD_FRIEND',
  SEND_MESSAGE: 'SEND_MESSAGE',
  ADD_MESSAGE: 'ADD_MESSAGE',
};
