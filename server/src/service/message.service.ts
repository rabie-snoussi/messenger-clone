import { DocumentDefinition } from 'mongoose';

import Message, { MessageDocument } from '../model/message.model';

export const createMessage = async (
  input: DocumentDefinition<
    Omit<Omit<MessageDocument, 'createdAt'>, 'updatedAt'>
  >,
) => {
  try {
    return await Message.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
};
