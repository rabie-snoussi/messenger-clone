/* eslint-disable */
import { NextFunction, Request, Response } from 'express';
import { LeanDocument } from 'mongoose';
import get from 'lodash/get';
import omit from 'lodash/omit';
import {
  createUser,
  getUsers,
  findUser,
  deleteUser,
  updateUser,
  findUserAndPopulate,
} from '../service/user.service';
import { UserDocument } from '../model/user.model';
import {
  addSentRequest,
  addReceivedRequest,
  hasSentRequest,
  hasReceivedRequest,
  removeSentRequest,
  removeReceivedRequest,
  hasFriend,
  addFriend,
  removeFriend,
} from './helper';
import log from '../logger';

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUser(req.body);
    const userOmittedPwd:
      | Omit<UserDocument, 'password'>
      | LeanDocument<Omit<UserDocument, 'password'>> = omit(user.toJSON());

    Object.defineProperty(req, 'user', {
      value: userOmittedPwd,
    });

    return next();
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    const usersWithoutPwd = users.map(({ password, ...rest }) => rest);

    return res.send(usersWithoutPwd);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'params.userId');
    const user = await findUser({ _id: userId });

    return res.send(omit(user, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getUserFromTokenHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const user = await findUser({ _id: userId });

    return res.send(omit(user, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'params.userId');
    const update = req.body;

    const updatedUser = await updateUser({ _id: userId }, update, {
      new: true,
    });

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = get(req, 'params.userId');

    await deleteUser({ _id: userId });

    return next();
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const sendFriendRequestHandler = async (req: Request, res: Response) => {
  try {
    const senderId = String(get(req, 'user._id'));
    const receiverId = get(req, 'body.userId');

    if (senderId === receiverId) return res.sendStatus(403);

    const receiver = await findUser({ _id: receiverId });
    const sender = await findUser({ _id: senderId });

    if (!receiver || !sender) return res.sendStatus(404);

    if (
      hasSentRequest(sender, receiverId) ||
      hasReceivedRequest(receiver, senderId) ||
      hasFriend(receiver, senderId)
    )
      return res.sendStatus(403);

    const newSender = addSentRequest(sender, receiverId);
    const newReceiver = addReceivedRequest(receiver, senderId);

    await updateUser({ _id: receiverId }, omit(newReceiver, 'password'), {});

    const updatedUser = await updateUser(
      { _id: senderId },
      omit(newSender, 'password'),
      {
        new: true,
      },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getSentRequestsHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const user = await findUserAndPopulate({ _id: userId });

    if (!user) return res.sendStatus(404);

    return res.send(user.requests.sent);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getReceivedRequestsHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = get(req, 'user._id');
    const user = await findUserAndPopulate({ _id: userId });

    if (!user) return res.sendStatus(404);

    return res.send(user.requests.received);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteReceivedRequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const receiverId = String(get(req, 'user._id'));
    const senderId = get(req, 'params.userId');

    if (senderId === receiverId) return res.sendStatus(403);

    const receiver = await findUser({ _id: receiverId });
    const sender = await findUser({ _id: senderId });

    if (!receiver || !sender) return res.sendStatus(404);

    if (
      !hasSentRequest(sender, receiverId) ||
      !hasReceivedRequest(receiver, senderId)
    )
      return res.sendStatus(403);

    const newSender = removeSentRequest(sender, receiverId);
    const newReceiver = removeReceivedRequest(receiver, senderId);

    await updateUser({ _id: senderId }, omit(newSender, 'password'), {});

    const updatedUser = await updateUser(
      { _id: receiverId },
      omit(newReceiver, 'password'),
      {
        new: true,
      },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteSentRequestHandler = async (req: Request, res: Response) => {
  try {
    const senderId = String(get(req, 'user._id'));
    const receiverId = get(req, 'params.userId');

    if (senderId === receiverId) return res.sendStatus(403);

    const receiver = await findUser({ _id: receiverId });
    const sender = await findUser({ _id: senderId });

    if (!receiver || !sender) return res.sendStatus(404);

    if (
      !hasSentRequest(sender, receiverId) ||
      !hasReceivedRequest(receiver, senderId)
    )
      return res.sendStatus(403);

    const newSender = removeSentRequest(sender, receiverId);
    const newReceiver = removeReceivedRequest(receiver, senderId);

    await updateUser({ _id: receiverId }, omit(newReceiver, 'password'), {});

    const updatedUser = await updateUser(
      { _id: senderId },
      omit(newSender, 'password'),
      {
        new: true,
      },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const acceptRequestHandler = async (req: Request, res: Response) => {
  try {
    const receiverId = String(get(req, 'user._id'));
    const senderId = get(req, 'params.userId');

    if (senderId === receiverId) return res.sendStatus(403);

    const receiver = await findUser({ _id: receiverId });
    const sender = await findUser({ _id: senderId });

    if (!receiver || !sender) return res.sendStatus(404);

    if (
      !hasSentRequest(sender, receiverId) ||
      !hasReceivedRequest(receiver, senderId) ||
      hasFriend(receiver, senderId)
    )
      return res.sendStatus(403);

    const newSender = addFriend(
      removeSentRequest(sender, receiverId),
      receiverId,
    );
    const newReceiver = addFriend(
      removeReceivedRequest(receiver, senderId),
      senderId,
    );

    await updateUser({ _id: senderId }, omit(newSender, 'password'), {});

    const updatedUser = await updateUser(
      { _id: receiverId },
      omit(newReceiver, 'password'),
      { new: true },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getFriendsHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const user = await findUserAndPopulate({ _id: userId });

    if (!user) return res.sendStatus(404);

    return res.send(user.friends);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteFriendHandler = async (req: Request, res: Response) => {
  try {
    const userId = String(get(req, 'user._id'));
    const friendId = get(req, 'params.friendId');

    if (friendId === userId) return res.sendStatus(403);

    const user = await findUser({ _id: userId });
    const friend = await findUser({ _id: friendId });

    if (!user || !friend) return res.sendStatus(404);

    if (!hasFriend(friend, userId) || !hasFriend(user, friendId))
      return res.sendStatus(403);

    const newFriend = removeFriend(friend, userId);
    const newUser = removeFriend(user, friendId);

    await updateUser({ _id: friendId }, omit(newFriend, 'password'), {});

    const updatedUser = await updateUser(
      { _id: userId },
      omit(newUser, 'password'),
      {
        new: true,
      },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};
