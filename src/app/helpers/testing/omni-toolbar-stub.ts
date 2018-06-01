import {Component, Input} from '@angular/core';
import {UserProfile} from '../../models/user-profile';
import {Customer} from '../../models/customer';

@Component({
  selector: 'omni-toolbar',
  template: '',
})
export class OmniToolbarStubComponent {
  @Input() user: UserProfile;
  @Input() selectedCustomer: Customer;
  @Input() isCustomerPath: boolean;
  @Input() totalCustomers: Number;
}
