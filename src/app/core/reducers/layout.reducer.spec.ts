import { layoutActions } from '../actions';
import { reducer } from './layout.reducer';

const initialState = {
  showSidenav: false,
  showSpinner: false
};

describe('The layout reducer', () => {
  it('The initial layout state should be sidenave closed', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is OpenSidenav', () => {
    it('should return layout state as sidenave open', () => {
      const result = reducer(reducer(undefined, { type: null }), new layoutActions.OpenSidenav());
      expect(result).toEqual({ showSidenav: true, showSpinner: false });
    });
  });

  describe('when sidenav is open and the dispatched action is CloseSidenav', () => {
    it('should return layout state as sidenav closed', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new layoutActions.OpenSidenav()), new layoutActions.CloseSidenav());
      expect(result).toEqual({ showSidenav: false, showSpinner: false });
    });
  });

  describe('when the dispatched action is ShowSpinner', () => {
    it('should return layout state as showSpinner true', () => {
      const result = reducer(reducer(undefined, { type: null }), new layoutActions.ShowSpinner());
      expect(result).toEqual({ showSidenav: false, showSpinner: true });
    });
  });

  describe('when spinner is shown and the dispatched action is hideSpinner', () => {
    it('should return layout state as showSpinner false', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new layoutActions.ShowSpinner()), new layoutActions.HideSpinner());
      expect(result).toEqual({ showSidenav: false, showSpinner: false });
    });
  });
});
