/* eslint-disable */
import { Express } from 'express';

import {
  createUserHandler,
  getUsersHandler,
  getUserFromTokenHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  sendFriendRequestHandler,
  getSentRequestsHandler,
  getReceivedRequestsHandler,
  deleteSentRequestHandler,
  deleteReceivedRequestHandler,
  acceptRequestHandler,
  getFriendsHandler,
  deleteFriendHandler,
} from './controller/user.controller';
import { signInHandler, signOutHandler } from './controller/session.controller';
import { validateRequest } from './middleware';
import { userAuthenticated, isOwner } from './middleware/userAuthenticated';
import {
  createUserSchema,
  updateUserSchema,
  friendRequestSchema,
} from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';

export default function (app: Express) {
  // Add a user
  app.post(
    '/api/users',
    validateRequest(createUserSchema),
    createUserHandler,
    signInHandler,
  );

  // Get users
  app.get('/api/users', userAuthenticated(), getUsersHandler);

  // Get a user
  app.get('/api/users/:userId', userAuthenticated(), getUserHandler);

  // Get user from token
  app.get('/api/user', userAuthenticated(), getUserFromTokenHandler);

  // Update a user
  app.patch(
    '/api/users/:userId',
    [userAuthenticated(isOwner), validateRequest(updateUserSchema)],
    updateUserHandler,
  );

  // Delete a user
  app.delete(
    '/api/users/:userId',
    userAuthenticated(isOwner),
    deleteUserHandler,
    signOutHandler,
  );

  // Authenticate
  app.post('/api/auth', validateRequest(createSessionSchema), signInHandler);

  // Logout
  app.delete('/api/auth', userAuthenticated(), signOutHandler);

  // Add a friend request
  app.patch(
    '/api/requests',
    [userAuthenticated(), validateRequest(friendRequestSchema)],
    sendFriendRequestHandler,
  );

  // Get sent requests
  app.get('/api/requests/sent', userAuthenticated(), getSentRequestsHandler);

  // Get received requests
  app.get(
    '/api/requests/received',
    userAuthenticated(),
    getReceivedRequestsHandler,
  );

  // Delete sent request
  app.delete(
    '/api/requests/sent/:userId',
    userAuthenticated(),
    deleteSentRequestHandler,
  );

  // Delete received request
  app.delete(
    '/api/requests/received/:userId',
    userAuthenticated(),
    deleteReceivedRequestHandler,
  );

  // Accept request
  app.patch(
    '/api/requests/accept/:userId',
    userAuthenticated(),
    acceptRequestHandler,
  );

  // Get friends list
  app.get('/api/friends', userAuthenticated(), getFriendsHandler);

  // Delete friend
  app.delete(
    '/api/friends/:friendId',
    userAuthenticated(),
    deleteFriendHandler,
  );
}
