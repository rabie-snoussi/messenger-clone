import mongoose from 'mongoose';
import { MessageDocument } from './message.model';
import { UserDocument } from './user.model';

export interface ConversationDocument extends mongoose.Document {
  participants: UserDocument[];
  messages: MessageDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
    ],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: [] },
    ],
  },
  { timestamps: true, versionKey: false },
);

const Conversation = mongoose.model<ConversationDocument>(
  'Conversation',
  ConversationSchema,
);

export default Conversation;
