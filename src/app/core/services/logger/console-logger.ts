import {Logger} from './logger';

const noop = (): any => undefined;

export class ConsoleLogger implements Logger {
  constructor(private _console: Console, private _debugEnabled: boolean = true) {
  }

  log(...args: any[]): void {
    this._invokeConsoleMethod('log', args);
  }

  info(...args: any[]): void {
    this._invokeConsoleMethod('info', args);
  }

  warn(...args: any[]): void {
    this._invokeConsoleMethod('warn', args);
  }

  error(...args: any[]): void {
    this._invokeConsoleMethod('error', args);
  }

  debug(...args: any[]): void {
    if (this._debugEnabled) {
      this._invokeConsoleMethod('debug', args);
    }
  }

  group(groupTitle?: string): void {
    const args = groupTitle != null ? [groupTitle] : [];
    this._invokeConsoleMethod('group', args);
  }

  groupEnd(): void {
    this._invokeConsoleMethod('groupEnd');
  }

  private _invokeConsoleMethod(type: string, args?: any[]): void {
    const logFn: Function = (<any>this._console)[type] || this._console.log || noop;

    logFn.apply(this._console, args);
  }
}

