import { layoutActions } from './';

describe('Layout Actions', () => {
  it('should define a Layout Close sidenav Action', () => {
    const action = new layoutActions.CloseSidenav();
    expect(action.type).toBe(layoutActions.CLOSE_SIDENAV);
  });

  it('should define a Layout Open sidenav Action', () => {
    const action = new layoutActions.OpenSidenav();
    expect(action.type).toBe(layoutActions.OPEN_SIDENAV);
  });

  it('should define a Layout Show Spinner Action', () => {
    const action = new layoutActions.ShowSpinner();
    expect(action.type).toBe(layoutActions.SHOW_SPINNER);
  });

  it('should define a Layout Hide Spinner Action', () => {
    const action = new layoutActions.HideSpinner();
    expect(action.type).toBe(layoutActions.HIDE_SPINNER);
  });
});
