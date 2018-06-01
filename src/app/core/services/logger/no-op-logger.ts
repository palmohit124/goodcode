/**
 * No op implementation of {@link Logger}.
 *
 */
import {Logger} from './logger';

export class NoOpLogger implements Logger {
  log(): void {
  }

  info(): void {
  }

  warn(): void {
  }

  error(): void {
  }

  debug(): void {
  }

  group(): void {
  }

  groupEnd(): void {
  }
}
