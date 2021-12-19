import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface MessageDocument extends mongoose.Document {
  userId: UserDocument;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Message = mongoose.model<MessageDocument>('Message', MessageSchema);

export default Message;
