import { LeanDocument } from 'mongoose';
import { UserDocument } from '../model/user.model';

export const filterRequests = (
  userRequests: UserDocument[] | LeanDocument<UserDocument>[],
  userId: string,
) => userRequests.filter((item) => String(item._id) === String(userId));
