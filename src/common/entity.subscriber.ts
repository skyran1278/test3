import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import chalk from 'chalk';
import { Theme, highlight } from 'cli-highlight';
import { isObject } from 'lodash';
import { DataSource, EntitySubscriberInterface } from 'typeorm';
import { AfterQueryEvent } from 'typeorm/subscriber/event/QueryEvent';

import { AlsService } from '../als/als.service';

@Injectable()
export class EntitySubscriber implements EntitySubscriberInterface {
  /**
   * @description Can not use the transaction manager in the subscriber.
   */
  constructor(
    readonly dataSource: DataSource,
    private readonly alsService: AlsService,
  ) {
    dataSource.subscribers.push(this);
  }

  afterQuery(event: AfterQueryEvent<unknown>): void {
    const requestId = this.alsService.get('requestId');
    const logger = new Logger(`RequestId: ${requestId}`);
    const executionTime = `\x1B[33m+${event.executionTime}ms\x1B[39m`;
    const interpolatedQuery = this.interpolate(event.query, event.parameters);

    logger.log(
      `query: ${this.highlightSql(interpolatedQuery)} ${executionTime}`,
    );
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParams(parameters: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }

  private interpolate(query: string, parameters?: unknown[]): string {
    if (!parameters || parameters.length === 0) {
      return query;
    }

    return query.replace(/\$(\d+)/g, (_, p1: string) => {
      const index = parseInt(p1, 10) - 1;

      if (index < 0 || index >= parameters.length) {
        throw new Error(`Parameter index out of bounds: $${p1}`);
      }

      const value = parameters[index];
      return this.formatParameter(value);
    });
  }

  /**
   * Formats a single parameter based on its type.
   */
  private formatParameter(value: unknown): string {
    if (value === null || value === undefined) {
      return 'NULL'; // Explicitly handle null/undefined as SQL NULL.
    }

    if (typeof value === 'boolean' || typeof value === 'number') {
      return `${value}`; // Numbers and booleans can be returned as-is.
    }

    if (typeof value === 'string') {
      return `'${value.replace(/'/g, "''")}'`; // Escape single quotes in strings.
    }

    if (value instanceof Date) {
      return `'${value.toISOString()}'`; // ISO date string.
    }

    if (Array.isArray(value)) {
      return `'{${value.map((v) => this.formatParameter(v)).join(', ')}}'`; // Recursively format array values.
    }

    if (isObject(value)) {
      return `'${JSON.stringify(value).replace(/'/g, "''")}'`; // JSON-encode objects and escape single quotes.
    }

    throw new NotImplementedException(
      `Parameter type not implemented: ${typeof value}`,
    );
  }

  private highlightSql(sql: string) {
    const theme: Theme = {
      keyword: chalk.blueBright,
      literal: chalk.blueBright,
      string: chalk.white,
      type: chalk.magentaBright,
      built_in: chalk.magentaBright,
      comment: chalk.gray,
    };
    return highlight(sql, { theme: theme, language: 'sql' });
  }
}
