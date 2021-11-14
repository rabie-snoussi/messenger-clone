import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
