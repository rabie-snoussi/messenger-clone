import {
  DocumentDefinition,
  Error,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import omit from 'lodash/omit';
import bcrypt from 'bcrypt';
import config from 'config';
import User, { UserDocument } from '../model/user.model';

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
    const hash = await bcrypt.hashSync(input.password, salt);

    return await User.create({ ...input, password: hash });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions,
) => {
  try {
    if (update.password) {
      const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
      const hash = await bcrypt.hashSync(update.password, salt);

      return await User.findOneAndUpdate(
        query,
        { ...update, password: hash },
        options,
      ).lean();
    }

    return await User.findOneAndUpdate(query, update, options).lean();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findUser = async (query: FilterQuery<UserDocument>) =>
  User.findOne(query).lean();
// .populate('friends', '-password')
// .populate('requests.sent', '-password')
// .populate('requests.received', '-password');

export const validatePassword = async ({
  email,
  password,
}: {
  email: UserDocument['email'];
  password: string;
}) => {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
};

export const getUsers = async () => User.find({}).lean();

export const findAndUpdate = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions,
) => User.findOneAndUpdate(query, update, options).lean();

export const deleteUser = async (query: FilterQuery<UserDocument>) =>
  User.deleteOne(query);
