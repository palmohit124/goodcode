import {InjectionToken} from '@angular/core';

export interface LoggerOptions {
  enabled?: boolean;
  debug?: boolean;
}

export const LOGGER_OPTIONS = new InjectionToken<LoggerOptions>('Logger Options');
