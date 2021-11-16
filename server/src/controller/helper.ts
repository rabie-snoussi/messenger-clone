import isEmpty from 'lodash/isEmpty';
import { LeanDocument } from 'mongoose';
import { UserDocument } from '../model/user.model';

export const hasReceivedRequest = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => !isEmpty(user.requests.received.filter((id) => String(id) === userId));

export const hasSentRequest = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => !isEmpty(user.requests.sent.filter((id) => String(id) === userId));

export const hasFriend = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => !isEmpty(user.friends.filter((id) => String(id) === userId));

export const addSentRequest = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => {
  const sent = [...user.requests.sent, userId];

  return {
    ...user,
    requests: { ...user.requests, sent },
  };
};

export const addReceivedRequest = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => {
  const received = [...user.requests.received, userId];

  return {
    ...user,
    requests: { ...user.requests, received },
  };
};

export const removeSentRequest = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => {
  const sent = user.requests.sent.filter((id) => String(id) !== userId);

  return {
    ...user,
    requests: { ...user.requests, sent },
  };
};

export const removeReceivedRequest = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => {
  const received = user.requests.received.filter((id) => String(id) !== userId);

  return {
    ...user,
    requests: { ...user.requests, received },
  };
};

export const addFriend = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => {
  const friends = [...user.friends, userId];

  return {
    ...user,
    friends,
  };
};

export const removeFriend = (
  user: UserDocument | LeanDocument<UserDocument>,
  userId: string,
) => {
  const friends = user.friends.filter((id) => String(id) !== userId);

  return {
    ...user,
    friends,
  };
};
