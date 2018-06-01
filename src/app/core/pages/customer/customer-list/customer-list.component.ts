import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CreateCustomerModalComponent } from '../create-customer-modal/create-customer-modal.component';
import { customerActions } from '../../../actions';
import { ClientState, customer, getCustomerState, getCustomerCreationStatus } from '../../../reducers';
import { Customer } from '../../../../models/customer';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'omni-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerListComponent implements OnDestroy {

  sortOrderAscending: boolean = true;
  limit: number = 10;
  pageIndex: number = 0;
  filter: string = 'active';
  customerState: customer.CustomerState;
  customerSubscription: Subscription;
  customerCreationSubscription: Subscription;
  term = new FormControl();

  constructor(public dialog: MatDialog, public store: Store<ClientState>, public router: Router) {
    this.customerSubscription = this.store.select(getCustomerState).subscribe(state => {
      this.customerState = state;
      this.orderBy(this.sortOrderAscending);
    });

    this.customerCreationSubscription = this.store.select(getCustomerCreationStatus)
      .filter(customerCreated => customerCreated)
      .subscribe(() => this.initCustomers());

    this.term.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => {
        this.pageIndex = 0;
        this.loadCustomers();
      });
  }

  initCustomers() {
    this.sortOrderAscending = true;
    this.limit = 10;
    this.pageIndex = 0;
    this.filter = 'active';
    if (!this.term.value) {
      this.loadCustomers();
    } else {
      this.term.setValue('');
    }
  }

  public openCreateCustomerModal() {
    const dialogRef = this.dialog.open(CreateCustomerModalComponent);
  }

  public selectCustomer(selectedCustomer: Customer) {
    this.store.dispatch(new customerActions.Select(selectedCustomer));
    this.router.navigate(['search-analytics']);
  }

  public changeFilter(filterValue: string) {
    this.filter = filterValue;
    this.pageIndex = 0;
    this.loadCustomers();
  }

  public paginate(event) {
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
    this.loadCustomers();
  }

  public loadCustomers() {
    const queryParam = {
      offset: this.pageIndex * this.limit,
      limit: this.limit
    };
    if (this.term.value) {
      queryParam['name'] = this.term.value.trim();
    }
    if (this.filter !== 'all') {
      queryParam['status'] = this.filter;
    }
    this.store.dispatch(new customerActions.Load(queryParam));
  }

  public orderBy(sortOrder) {
    this.sortOrderAscending = sortOrder;
    this.customerState.customers.customers.sort((a: Customer, b: Customer) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return this.sortOrderAscending ? -1 : 1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return this.sortOrderAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  ngOnDestroy() {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
    if (this.customerCreationSubscription) {
      this.customerCreationSubscription.unsubscribe();
    }
  }
}
