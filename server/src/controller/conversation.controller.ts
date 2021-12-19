/* eslint-disable */
import { NextFunction, Request, Response } from 'express';
import get from 'lodash/get';

import {
  createConversation,
  findConversations,
  findConversation,
} from '../service/conversation.service';
import log from '../logger';

export const createConversationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = get(req, 'user._id');
    const participant = req.body.participant;

    const existingConversation = await findConversation({
      $and: [{ participants: userId }, { participants: participant }],
    });

    if (existingConversation) return res.sendStatus(403);

    const conversation = await createConversation({
      participants: [participant, userId],
    });

    return res.send(conversation);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getConversationsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = get(req, 'user._id');
    const conversations = await findConversations({
      participants: userId,
    });

    return res.send(conversations);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getConversationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const conversationId = get(req, 'params.conversationId');
    const conversation = await findConversation({ _id: conversationId });

    return res.send(conversation);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};
