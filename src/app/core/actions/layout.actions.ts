import { Action } from '@ngrx/store';
import { tag } from '../../helpers';

export const OPEN_SIDENAV = tag('[Layout] Open Sidenav');
export const CLOSE_SIDENAV = tag('[Layout] Close Sidenav');
export const SHOW_SPINNER = tag('[Layout] Show Spinner');
export const HIDE_SPINNER = tag('[Layout] Hide Spinner');

export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class ShowSpinner implements Action {
  readonly type = SHOW_SPINNER;
}

export class HideSpinner implements Action {
  readonly type = HIDE_SPINNER;
}

export type Actions =
  OpenSidenav |
  CloseSidenav |
  ShowSpinner |
  HideSpinner;
