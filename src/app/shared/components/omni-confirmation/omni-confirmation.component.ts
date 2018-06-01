import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'omni-confirmation',
  templateUrl: './omni-confirmation.component.html',
  styleUrls: ['./omni-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OmniConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<OmniConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
