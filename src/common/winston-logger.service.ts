import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import winston, { createLogger, format, transports } from 'winston';

@Injectable()
export class WinstonLogger extends ConsoleLogger {
  private logger!: winston.Logger;

  constructor(readonly configService: ConfigService) {
    super();
    // https://expressjs.com/en/advanced/best-practice-performance.html#do-logging-correctly
    // https://github.com/winstonjs/winston/blob/master/examples/quick-start.js
    this.logger = createLogger({
      level: configService.get('LOGGING_LEVEL'),
      format:
        configService.get('NODE_ENV') === 'production'
          ? format.combine(
              format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              format.errors({ stack: true }),
              format.splat(),
              format.json(),
            )
          : format.combine(
              format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              format.errors({ stack: true }),
              format.colorize({ all: true }),
              format.splat(),
              format.simple(),
            ),
      defaultMeta: {
        service: configService.get<string>('LOGGING_SERVICE_NAME'),
      },
      transports: [new transports.Console()],
    });
  }

  /**
   * Write a 'log' level log.
   */
  log(message: unknown, ...optionalParams: unknown[]) {
    if (optionalParams) {
      this.logger.info({ message, ...optionalParams });
    } else {
      this.logger.info(message);
    }
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: unknown, ...optionalParams: unknown[]) {
    if (optionalParams) {
      this.logger.error({ message, ...optionalParams });
    } else {
      this.logger.error(message);
    }
  }

  /**
   * Write an 'error' level log.
   */
  error(message: unknown, ...optionalParams: unknown[]) {
    if (optionalParams) {
      this.logger.error({ message, ...optionalParams });
    } else {
      this.logger.error(message);
    }
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: unknown, ...optionalParams: unknown[]) {
    if (optionalParams) {
      this.logger.warn({ message, ...optionalParams });
    } else {
      this.logger.warn(message);
    }
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: unknown, ...optionalParams: unknown[]) {
    if (optionalParams) {
      this.logger.debug({ message, ...optionalParams });
    } else {
      this.logger.debug(message);
    }
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: unknown, ...optionalParams: unknown[]) {
    if (optionalParams) {
      this.logger.verbose({ message, ...optionalParams });
    } else {
      this.logger.verbose(message);
    }
  }
}
