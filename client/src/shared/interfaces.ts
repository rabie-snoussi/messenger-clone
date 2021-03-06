export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  requests: {
    sent: string[];
    received: string[];
  };
  friends: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserCreation {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}
export interface UserUpdate {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

export interface Message {
  _id: string;
  user: User;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  participants: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversation {
  participant: string;
}

export interface FriendRequest {
  userId: string;
}

export interface SendMessage {
  conversationId: string;
  message: string;
}
