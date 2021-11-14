import pinoms from 'pino-multi-stream';
import stream from 'stream';
import childProcess from 'child_process';

const cwd = process.cwd();

const logThrough = new stream.PassThrough();
const prettyStream = pinoms.prettyStream({
  prettyPrint: {
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'hostname,pid',
  },
});

const streams = [{ stream: logThrough }, { stream: prettyStream }];
// @ts-ignore
const log = pinoms(pinoms.multistream(streams));

const logPath = `${cwd}/log`;

const child = childProcess.spawn(
  process.execPath,
  [require.resolve('pino-tee'), 'error', `${logPath}/error.log`],
  { cwd },
);

logThrough.pipe(child.stdin);

export default log;
