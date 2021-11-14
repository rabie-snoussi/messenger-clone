import { Express } from 'express';

import {
  createUserHandler,
  getUsersHandler,
  getUserFromTokenHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from './controller/user.controller';
import { signInHandler, signOutHandler } from './controller/session.controller';
import { validateRequest } from './middleware';
import { userAuthenticated, isOwner } from './middleware/userAuthenticated';
import { createUserSchema, updateUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';

export default function (app: Express) {
  // Add a user
  app.post(
    '/api/users',
    validateRequest(createUserSchema),
    createUserHandler,
    signInHandler,
  );

  // List users
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
}
