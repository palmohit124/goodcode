import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { UserProfile } from '../../../models/user-profile';
import { MatDialog } from '@angular/material';
import { EditCustomerModalComponent } from '../../pages';
import { Customer } from '../../../models/customer';

@Component({
  selector: 'omni-toolbar',
  templateUrl: './omni-toolbar.component.html',
  styleUrls: ['./omni-toolbar.component.scss'],
})
export class OmniToolbarComponent {
  @Input() user: UserProfile;
  @Output() logoutAction: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(public dialog: MatDialog) {
   }

  logout(event: MouseEvent) {
    this.logoutAction.emit(event);
  }

  public openEditCustomerModal () {
    const dialogRef = this.dialog.open(EditCustomerModalComponent);
  }
}
