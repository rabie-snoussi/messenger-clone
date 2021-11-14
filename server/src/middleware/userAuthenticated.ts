import { Request, Response, NextFunction } from 'express';
import get from 'lodash/get';

export const userAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = get(req, 'user');
  if (!user) return res.sendStatus(403);
  return next();
};
