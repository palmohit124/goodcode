export abstract class Logger {
  /** Write a log message. */
  abstract log(...args: any[]): void;

  /** Write an information message. */
  abstract info(...args: any[]): void;

  /** Write a warning message. */
  abstract warn(...args: any[]): void;

  /** Write an error message. */
  abstract error(...args: any[]): void;

  /** Write a debug message. */
  abstract debug(...args: any[]): void;

  /** Create a new inline group. */
  abstract group(groupTitle?: string): void;

  /** Exit the current inline group. */
  abstract groupEnd(): void;
}
