import {Injectable} from '@angular/core';

@Injectable()
export class Clock {
  constructor() {
  }

  getTime(): number {
    return new Date().getTime();
  }
  getDateString(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
