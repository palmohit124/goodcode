import {layoutActions} from '../actions';

export interface LayoutState {
  showSidenav: boolean;
  showSpinner: boolean;
}

const initialState: LayoutState = {
  showSidenav: false,
  showSpinner: false
};

export function reducer(state = initialState, action: layoutActions.Actions): LayoutState {
  switch (action.type) {
    case layoutActions.CLOSE_SIDENAV:
      return {
        ...state,
        showSidenav: false
      };

    case layoutActions.OPEN_SIDENAV:
      return {
        ...state,
        showSidenav: true
      };

    case layoutActions.SHOW_SPINNER:
      return {
        ...state,
        showSpinner: true
      };

    case layoutActions.HIDE_SPINNER:
      return {
        ...state,
        showSpinner: false
      };

    default:
      return state;
  }
}
