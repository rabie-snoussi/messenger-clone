import { Request, Response } from 'express';
import get from 'lodash/get';

import {
  createConversation,
  findConversationsAndPopulate,
  findConversation,
  findAndUpdate,
  findConversationAndPopulate,
} from '../service/conversation.service';
import log from '../logger';
import { createMessage } from '../service/message.service';

export const createConversationHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = get(req, 'user._id');
    const participant = get(req, 'body.participant');

    const existingConversation = await findConversationAndPopulate({
      $and: [{ participants: userId }, { participants: participant }],
    });

    if (existingConversation) return res.send(existingConversation);

    const conversation = await createConversation({
      participants: [participant, userId],
    });

    return res.send(conversation);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getConversationsHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const conversations = await findConversationsAndPopulate({
      participants: userId,
    });

    return res.send(conversations);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getConversationHandler = async (req: Request, res: Response) => {
  try {
    const conversationId = get(req, 'params.conversationId');
    const conversation = await findConversationAndPopulate({
      _id: conversationId,
    });

    if (!conversation) return res.sendStatus(404);

    return res.send(conversation);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const createMessageHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const conversationId = get(req, 'params.conversationId');
    const conversation = await findConversation({ _id: conversationId });
    const message = get(req, 'body.message');

    if (!conversation) return res.sendStatus(404);

    const createdMessage = await createMessage({ user: userId, message });
    const newMessages = [...conversation.messages, createdMessage._id];

    await findAndUpdate(
      { _id: conversationId },
      { messages: newMessages },
      {},
    );

    const populatedMessage = await createdMessage.populate('user', '-password').execPopulate();

    return res.send(populatedMessage);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};
