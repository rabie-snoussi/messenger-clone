import { Request, Response, NextFunction } from 'express';
import get from 'lodash/get';

interface Params {
  userId: string;
}
interface User {
  _id: Object;
  firstname: string;
  lastname: string;
}

export const isOwner = (params: Params, user: User) =>
  params?.userId === String(user._id);

export const userAuthenticated =
  (userCheck?: Function) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = get(req, 'user');

      if (!user) return res.sendStatus(403);

      if (userCheck && !userCheck(req.params, user)) return res.sendStatus(403);
      return next();
    };
