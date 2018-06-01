import {Logger} from './logger';
import {isDevMode} from '@angular/core';
import {NoOpLogger} from './no-op-logger';
import {ConsoleLogger} from './console-logger';
import {LoggerOptions, LOGGER_OPTIONS} from './logger-options';

export function loggerFactory(options?: LoggerOptions): Logger {
  options = options || {};
  const enabled = options.enabled != null ? options.enabled : isDevMode();

  if (enabled) {
    const _console: Console = typeof console === 'object' ? console : <any>{};
    const debug = options.debug != null ? options.debug : true;
    return new ConsoleLogger(_console, debug);
  }

  return new NoOpLogger();
}

export {LOGGER_OPTIONS, LoggerOptions, Logger};
