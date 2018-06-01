import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { CustomerService } from '../services/customer/customer.service';
import { customerActions } from '../actions';
import { ToastService } from '../services/toastr/toast.service';
import { ClientState } from '../reducers';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CustomerEffects {

  constructor(private actions$: Actions,
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastService,
    private store: Store<ClientState>) {
  }

  @Effect()
  loadCustomersInit$ =
    this.actions$
      .pipe(
        ofType(customerActions.LOADINIT),
        withLatestFrom(this.store, (action, state) => ({ action, state })),
        switchMap(({ action, state }) => {
          if (!state.customer.loaded && !state.customer.loading) {
            return Observable.of(new customerActions.Load({
              offset: 0,
              limit: 10,
              status: 'active'
            }));
          } else {
            return empty();
          }
        })
      );

  @Effect()
  loadCustomers$ =
    this.actions$
      .pipe(
        ofType(customerActions.LOAD),
        switchMap((c: customerActions.Load) =>
          this.customerService
            .loadCustomers(c.payload)
            .pipe(
              map(result => new customerActions.LoadSuccess(result)),
              catchError(error => Observable.of(new customerActions.LoadFail(error))),
            )
        )
      );

  @Effect()
  addCustomer$ =
    this.actions$
      .pipe(
        ofType(customerActions.ADD),
        switchMap((c: customerActions.Add) =>
          this.customerService
            .createCustomer(c.body)
              .pipe(
                map(result => new customerActions.AddSuccess()),
                catchError(error => Observable.of(new customerActions.AddFail(error)))
              )
        )
      );

  @Effect()
  addCustomerSuccess$ =
    this.actions$
    .pipe(
      ofType(customerActions.ADD_SUCCESS),
      map(() => {
        this.toastrService.show('New customer has been created', 'Congratulations !!', 'success');
        return new customerActions.ResetCustomerCreationStatus();
      })
    );

  @Effect({ dispatch: false })
  addCustomerFail$ =
    this.actions$
      .pipe(
        ofType(customerActions.ADD_FAIL),
        tap(() => this.toastrService.show('There was a problem in creating customer', 'Sorry !!', 'error'))
      );

  @Effect()
  editCustomer$ =
    this.actions$
      .pipe(
        ofType(customerActions.EDIT),
        switchMap((c: customerActions.Edit) =>
          this.customerService
            .editCustomer(c.id, c.body)
            .pipe(
              map(result => new customerActions.EditSuccess(result)),
              catchError(error => Observable.of(new customerActions.EditFail(error))),
            )
        )
      );


  @Effect({ dispatch: false })
  editCustomerSuccess$ =
    this.actions$
      .pipe(
        ofType(customerActions.EDIT_SUCCESS),
        tap(() => this.toastrService.show('The customer has been edited', 'Congratulations !!', 'success'))
      );

  @Effect({ dispatch: false })
  editCustomerFail$ =
    this.actions$
    .pipe(
      ofType(customerActions.EDIT_FAIL),
      tap(() => this.toastrService.show('There was a problem editing customer', 'Sorry !!', 'error'))
    );

  @Effect()
  selectCustomer$ =
    this.actions$
      .pipe(
        ofType(customerActions.SELECT),
        switchMap((c: customerActions.Select) =>
          this.customerService
            .saveCustomerSession(c.payload.id)
            .pipe(
              map(result => new customerActions.SelectSuccess(c.payload)),
              catchError(error => Observable.of(new customerActions.SelectSuccess(c.payload)))
            )
        )
    );
  // Select Success action dispatch in case of success or error to avoid redirection to customer list

  @Effect({ dispatch: false })
  selectCustomerFail$ =
    this.actions$
      .pipe(
        ofType(customerActions.SELECT_FAIL),
        tap(() => this.router.navigate(['customer']))
      );


  @Effect()
  selectedInit$ =
    this.actions$
      .pipe(
        ofType(customerActions.SELECTED_INIT),
        withLatestFrom(this.store, (action, state) => ({ action, state })),
        switchMap(({ action, state }) => {
          if (state.customer.selectedCustomer) {
            return empty();
          } else {
            return this.customerService
              .loadCustomerSession()
              .then(result => {
                return new customerActions.SelectSuccess(result);
              })
              .catch((error) => new customerActions.SelectFail(error));
          }
        })
      );
}
