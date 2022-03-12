import { io, Socket as SocketClass } from 'socket.io-client';

import { SERVER_ENDPOINT } from './constants';

class Socket {
  io: SocketClass | null;

  constructor() {
    this.io = null;
  }

  connect() {
    this.io = io(SERVER_ENDPOINT, {
      withCredentials: true,
    });
  }
}

export default new Socket();
