import {InjectionToken} from '@angular/core';

export function open(url: string): void {
  const w = 512;
  const h = 800;
  const t = window.top.outerHeight / 2 + window.top.screenY - ( h / 2);
  const l = window.top.outerWidth / 2 + window.top.screenX - ( w / 2);
  window.open(url, null, `menubar=no,toolbar=no,location=yes,personalbar=no,status=no,width=${w},height=${h},top=${t},left=${l}`);
}

export const POPUP_FACTORY: InjectionToken<(string) => void> = new InjectionToken<(string) => void>('popup_opener');

export const POPUP_FACTORY_PROVIDER = {
  provide: POPUP_FACTORY,
  useValue: open
};
