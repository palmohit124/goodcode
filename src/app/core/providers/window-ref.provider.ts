import {InjectionToken} from '@angular/core';

export const WindowRef: InjectionToken<Window> = new InjectionToken<Window>('window');

export const WINDOW_PROVIDER = {
  provide: WindowRef,
  useValue: window
};
