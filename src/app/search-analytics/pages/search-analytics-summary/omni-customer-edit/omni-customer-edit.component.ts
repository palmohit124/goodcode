import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClientState, getShowSidenav, getSelectedCustomers, getCustomerState, customer, getRouterUrl } from '../../../../core/reducers';
import { Customer } from '../../../../models/customer';
import { MatDialog } from '@angular/material';
import { EditCustomerModalComponent } from '../../../../core/pages';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';
import { Subscription } from 'rxjs/Subscription';
import { layoutActions } from '../../../../core/actions';

@Component({
  selector: 'omni-customer-edit',
  templateUrl: './omni-customer-edit.component.html',
  styleUrls: ['./omni-customer-edit.component.scss']
})
export class OmniCustomerEditComponent implements OnDestroy {
  showSidenav$: Observable<boolean>;
  selectedCustomer$: Observable<Customer>;
  customerState$: Observable<customer.CustomerState>;
  routerSubscription: Subscription;
  routesWithClosedSidenav: string[];

  constructor(private store: Store<ClientState>,
    public dialog: MatDialog,
    private clientConfigService: ClientConfigService) {
    this.selectedCustomer$ = this.store.select(getSelectedCustomers);
    this.showSidenav$ = this.store.select(getShowSidenav);
    this.customerState$ = this.store.select(getCustomerState);
    this.routesWithClosedSidenav = this.clientConfigService.get().routes.routesWithoutNav;
    this.routerSubscription = this.store.select(getRouterUrl).subscribe(routerState => {
      if (routerState) {
        if (this.routesWithClosedSidenav.indexOf(routerState.state.url) > -1) {
          this.store.dispatch(new layoutActions.CloseSidenav());
        } else {
          this.store.dispatch(new layoutActions.OpenSidenav());
        }
      }
    });
  }

  public openEditCustomerModal() {
    const dialogRef = this.dialog.open(EditCustomerModalComponent);
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
