/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import isEmpty from 'lodash/isEmpty';

export interface UserDocument extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  requests: { sent: string[]; received: string[] };
  friends: string[];
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    requests: {
      sent: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: [],
        },
      ],
      received: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: [],
        },
      ],
    },
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
