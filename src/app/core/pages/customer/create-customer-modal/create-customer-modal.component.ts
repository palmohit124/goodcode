import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { customerActions } from '../../../actions';
import { ClientState } from '../../../reducers';

@Component({
  selector: 'omni-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
  styleUrls: ['./create-customer-modal.component.scss']
})
export class CreateCustomerModalComponent implements OnInit {

  public customerName: string;

  constructor(public dialogRef: MatDialogRef<CreateCustomerModalComponent>
    , public store: Store<ClientState>) {
    this.customerName = '';
  }

  ngOnInit() {
  }

  createCustomer() {
    this.store.dispatch(new customerActions.Add({ name: this.customerName.trim(), subscriptions: [] }));
    this.dialogRef.close();
  }

}
