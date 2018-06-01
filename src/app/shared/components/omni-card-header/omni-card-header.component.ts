import { Component, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'omni-card-header',
  templateUrl: './omni-card-header.component.html',
  styleUrls: ['./omni-card-header.component.scss'],
})
export class OmniCardHeaderComponent {

  @Input()
  headerText: string;

  @Input()
  headerId: string;

  @Input()
  buttonText: String;

  @Input()
  buttonId: String;

  @Input()
  iconClass: String;

  @Input()
  buttonDisabled: boolean;

  @Output()
  action = new EventEmitter();

  constructor() { }

}
