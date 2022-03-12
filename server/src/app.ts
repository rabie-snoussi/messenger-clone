import express from 'express';
import { createServer } from 'http';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import dbConnect from './db/connect';
import routes from './routes';
import log from './logger';
import { deserializeUser } from './middleware';
import socket from './socket';

const port = config.get('port') as number;
const host = config.get('host') as string;
const clientUri = config.get('clientUri') as string;

const app = express();
app.use(cors({ origin: clientUri, credentials: true }));
app.use(cookieParser());
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
routes(app);

const server = createServer(app);
socket.setup(server);

socket.authValidation();

socket.io?.on('connection', (sockt) => {
  sockt.on('typing', (data) => {
    socket.io?.emit(`${data.conversationId}_typing`, data.users);
  });
});

server.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);
  dbConnect();
});
