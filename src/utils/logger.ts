const fs = require('fs');
import pino from 'pino';
import { format } from "date-fns";

const date = new Date();
const logDirectory = (process.env.PINO_LOG_DIRECTORY) ? `${process.env.PINO_LOG_DIRECTORY}/${format(date, "yyyy-MM-dd")}` 
                                                      :  `./logs/${format(date, "yyyy-MM-dd")}`
export const levels: Record<string, number> = {
  trace: 10,
  info: 20,
  debug: 30,
  warn: 40,
  error: 50,
  fatal: 60
}
export const envToLogger: any = {
  development: {
      level:  process.env.PINO_LOG_LEVEL || 'debug',
      transport: {
              target: "pino-pretty",
              options: {
                  translateTime: 'HH:MM:ss Z',
                  ignore: 'pid,hostname'
              }
      },
      redact: ['headers.authorization'],
      serializers: {
          req(request) {
              return {
                  method: request.method,
                  url: request.url,
                  path: request.routerPath,
                  parameter: request.params,
                  body: request.body
              }
          }
      },
  },
  production: {
    level:  "error",
    redact: ['headers.authorization'],
  },
  test: {
    level:  process.env.PINO_LOG_LEVEL || 'debug',
    transport: {
            target: "pino-pretty",
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
    },
    redact: ['headers.authorization'],
    serializers: {
        req(request) {
            return {
                method: request.method,
                url: request.url,
                path: request.routerPath,
                parameter: request.params,
                body: request.body
            }
        }
    },
  }
}

const transports = pino.transport({
  targets: [
    {
      level: "trace",
      target: "pino-pretty",
      options: { 
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
        ignore: 'pid,hostname' 
      }
    },
    {
      target: "pino/file",
      level: "debug",
      options: {
        destination: `${logDirectory}/debug.logs.log`,
        mkdir: true
      }
    },
    {
      target: "pino/file",
      level: "error",
      options: {
        destination: `${logDirectory}/error.logs.log`,
        mkdir: true,
        ignore: 'pid,hostname'
      }
    }
  ],
  levels: levels
});

const env: string = process.env.ENVIRONMENT ?? "development";
delete envToLogger[env].transport;
const logger = pino(
  envToLogger[env],
  transports
);


export default logger;

