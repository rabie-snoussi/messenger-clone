import config from 'config';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import get from 'lodash/get';
import isEmpty from 'lodash';
import cookie from 'cookie';

import { decode } from './utils/jwt.utils';
import { findUser } from './service/user.service';
import Session from './model/session.model';

const clientUri = config.get('clientUri') as string;

class Socket {
  clientUri: string;

  io: Server | null;

  constructor() {
    this.clientUri = clientUri;
    this.io = null;
  }

  setup(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: this.clientUri,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
      },
    });
  }

  authValidation() {
    this.io?.use(async (socket, next) => {
      try {
        if (!socket.handshake.headers.cookie)
          return next(new Error('Cookies not provided'));

        const cookies = cookie.parse(socket.handshake.headers.cookie as string);

        const accessToken = get(cookies, 'accessToken', '');

        if (!accessToken) return next(new Error('accessToken not provided'));

        const { decoded, expired } = decode(accessToken);

        const userId = get(decoded, 'userId');
        const user = await findUser({ _id: userId });

        if (decoded && !isEmpty(user)) return next(new Error('User not found'));

        const refreshToken = get(cookies, 'refreshToken', '');

        if (expired && refreshToken) {
          const { decoded, expired } = decode(refreshToken);

          if (expired) return next(new Error('refreshToken expired'));

          if (!decoded || !get(decoded, 'sessionId'))
            return next(new Error('Invalid refreshToken'));

          const session = await Session.findById(get(decoded, 'sessionId'));

          if (!session) return next(new Error('Invalid session'));

          const user = await findUser({ _id: session.userId });

          if (!user) return next(new Error('Invalid user'));

          return next();
        }

        return next();
      } catch (error) {
        return next(new Error('Error'));
      }
    });
  }
}

export default new Socket();
