import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';
import Conversation, {
  ConversationDocument,
} from '../model/conversation.model';

export const createConversation = async (
  input: DocumentDefinition<
    Omit<Omit<Omit<ConversationDocument, 'messages'>, 'createdAt'>, 'updatedAt'>
  >,
) => {
  try {
    return await Conversation.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findConversation = async (
  query: FilterQuery<ConversationDocument>,
) => Conversation.findOne(query).lean();

export const findConversations = async (
  query: FilterQuery<ConversationDocument>,
) => Conversation.find(query).lean();

export const findAndUpdate = async (
  query: FilterQuery<ConversationDocument>,
  update: UpdateQuery<ConversationDocument>,
  options: QueryOptions,
) => Conversation.findOneAndUpdate(query, update, options).lean();

export const deleteConversation = async (
  query: FilterQuery<ConversationDocument>,
) => Conversation.deleteOne(query);
