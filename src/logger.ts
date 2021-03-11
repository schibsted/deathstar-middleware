import Logger from 'bunyan';

export function getLogger(name: string): Logger {
  return Logger.createLogger({
    name,
    level: process.env.NODE_ENV === 'test' ? 'fatal' : 'debug',
  });
}
