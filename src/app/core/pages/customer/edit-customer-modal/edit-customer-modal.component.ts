import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getSelectedCustomers } from '../../../reducers';
import { Customer } from '../../../../models/customer';
import { customerActions } from '../../../actions';
import { Subscription } from 'rxjs/Subscription';
import { ClientState } from '../../../reducers';


@Component({
  selector: 'omni-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent implements OnInit, OnDestroy {

  public updatedCustomerName: string = '';
  selectedCustomer: Customer;
  selectedCustomerSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<EditCustomerModalComponent>,
    public store: Store<ClientState>) {
    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer =>
      this.selectedCustomer = customer);
  }

  ngOnInit() {
  }

  updateCustomer() {
    this.store.dispatch(new customerActions.Edit(this.selectedCustomer.id, { name: this.updatedCustomerName.trim(), subscriptions: [] }));
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
  }
}
