import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { customerActions } from '../actions';
import { ClientState, customer, getCustomerState } from '../reducers';

@Injectable()
export class CustomerRouteGuard implements CanActivate {

  constructor(private store: Store<ClientState>, private router: Router) {

  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(new customerActions.Load({
      offset: 0,
      limit: 10,
      status: 'active'
    }));

    return this.store.select(getCustomerState).filter(customerState => customerState.loaded)
      .switchMap((c: customer.CustomerState) => {
        // In case of ADMIN(Marchex Employee) exception can be added
        if (c.customers.total_items === 1) {
          this.store.dispatch(new customerActions.Select(c.customers.customers[0]));
          this.router.navigate(['search-analytics']); // Route will be changed to customer/summary.
          return Observable.of(false);
        } else {
          return Observable.of(true);
        }
      });
  }
}
