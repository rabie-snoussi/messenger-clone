import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  requests: UserDocument[];
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
