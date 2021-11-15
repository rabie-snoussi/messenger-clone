import { NextFunction, Request, Response } from 'express';
import { LeanDocument } from 'mongoose';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import {
  createUser,
  getUsers,
  findUser,
  deleteUser,
  updateUser,
} from '../service/user.service';
import { UserDocument } from '../model/user.model';
import { filterRequests } from './helper';
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
    const senderId = get(req, 'user._id');
    const receiverId = get(req, 'body.userId');

    if (String(senderId) === receiverId) return res.sendStatus(403);

    const receiver = await findUser({ _id: receiverId });

    if (!receiver) return res.sendStatus(404);

    const receiverRequests = get(receiver, 'requests', {
      sent: [],
      received: [],
    });

    if (!isEmpty(filterRequests(receiverRequests.received, senderId))) {
      return res.sendStatus(403);
    }

    if (!isEmpty(filterRequests(receiverRequests.sent, senderId))) {
      return res.sendStatus(403);
    }

    const sender = await findUser({ _id: senderId });
    const senderRequests = get(sender, 'requests', { sent: [], received: [] });

    if (!isEmpty(filterRequests(senderRequests.sent, receiverId))) {
      return res.sendStatus(403);
    }

    if (!isEmpty(filterRequests(senderRequests.received, receiverId))) {
      return res.sendStatus(403);
    }

    const receiverFriends = get(receiver, 'friends', []);

    if (!isEmpty(filterRequests(receiverFriends, senderId))) {
      return res.sendStatus(403);
    }

    const senderFriends = get(sender, 'friends', []);

    if (!isEmpty(filterRequests(senderFriends, receiverId))) {
      return res.sendStatus(403);
    }

    await updateUser(
      { _id: receiverId },
      {
        requests: {
          ...receiverRequests,
          received: [...receiverRequests.received, senderId],
        },
      },
      {},
    );

    const updatedUser = await updateUser(
      { _id: senderId },
      {
        requests: {
          ...senderRequests,
          sent: [...senderRequests.sent, receiverId],
        },
      },
      { new: true },
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
    const user = await findUser({ _id: userId });
    const sentRequests: UserDocument[] = get(user, 'requests.sent', []);

    return res.send(sentRequests);
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
    const user = await findUser({ _id: userId });
    const receivedRequests: UserDocument[] = get(user, 'requests.received', []);

    return res.send(receivedRequests);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteReceivedReqsHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const receiverId = get(req, 'user._id');
    const senderId = get(req, 'params.userId');

    const receiver = await findUser({ _id: receiverId });
    const receiverRequests = get(receiver, 'requests', {
      sent: [],
      received: [],
    });

    const receivedRequests = receiverRequests.received.filter(
      (user) => String(user._id) !== senderId,
    );

    const sender = await findUser({ _id: senderId });

    if (!isEmpty(sender)) {
      const senderRequests = get(sender, 'requests', {
        sent: [],
        received: [],
      });

      const sentRequests = senderRequests.sent.filter(
        (user) => String(user._id) !== String(receiverId),
      );

      await updateUser(
        { _id: senderId },
        {
          requests: {
            ...senderRequests,
            sent: sentRequests,
          },
        },
        {},
      );
    }

    const updatedUser = await updateUser(
      { _id: receiverId },
      {
        requests: { ...receiverRequests, received: receivedRequests },
      },
      { new: true },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteSentReqsHandler = async (req: Request, res: Response) => {
  try {
    const senderId = get(req, 'user._id');
    const receiverId = get(req, 'params.userId');

    const sender = await findUser({ _id: senderId });
    const senderRequests = get(sender, 'requests', {
      sent: [],
      received: [],
    });

    const sentRequests = senderRequests.sent.filter(
      (user) => String(user._id) !== receiverId,
    );

    const receiver = await findUser({ _id: receiverId });

    if (!isEmpty(receiver)) {
      const receiverRequests = get(receiver, 'requests', {
        sent: [],
        received: [],
      });

      const receivedRequests = receiverRequests.received.filter(
        (user) => String(user._id) !== String(senderId),
      );

      await updateUser(
        { _id: receiverId },
        {
          requests: {
            ...receiverRequests,
            received: receivedRequests,
          },
        },
        {},
      );
    }

    const updatedUser = await updateUser(
      { _id: senderId },
      {
        requests: { ...senderRequests, sent: sentRequests },
      },
      { new: true },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const acceptRequestHandler = async (req: Request, res: Response) => {
  try {
    const receiverId = get(req, 'user._id');
    const senderId = get(req, 'params.userId');

    if (String(senderId) === String(receiverId)) return res.sendStatus(403);

    const receiver = await findUser({ _id: receiverId });
    const receiverRequests = get(receiver, 'requests', {
      sent: [],
      received: [],
    });

    if (isEmpty(filterRequests(receiverRequests.received, senderId))) {
      return res.sendStatus(403);
    }

    const sender = await findUser({ _id: senderId });

    if (isEmpty(sender)) return res.sendStatus(403);

    const receiverFriends = get(receiver, 'friends', []);

    if (!isEmpty(filterRequests(receiverFriends, senderId))) {
      return res.sendStatus(403);
    }

    const senderFriends = get(sender, 'friends', []);

    if (!isEmpty(filterRequests(senderFriends, receiverId))) {
      return res.sendStatus(403);
    }

    const senderRequests = get(sender, 'requests', {
      sent: [],
      received: [],
    });

    const sentRequests = senderRequests.sent.filter(
      (user) => String(user._id) !== String(receiverId),
    );

    await updateUser(
      { _id: senderId },
      {
        requests: {
          ...senderRequests,
          sent: sentRequests,
        },
        friends: [...senderFriends, receiverId],
      },
      {},
    );

    const receivedRequests = receiverRequests.received.filter(
      (user) => String(user._id) !== String(senderId),
    );

    const updatedUser = await updateUser(
      { _id: receiverId },
      {
        requests: { ...receiverRequests, received: receivedRequests },
        friends: [...receiverFriends, senderId],
      },
      { new: true },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};
