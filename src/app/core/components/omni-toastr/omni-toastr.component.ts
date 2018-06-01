import { Component, OnInit, NgZone } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import {
  trigger,
  state,
  transition,
  animate,
  style,
  keyframes
} from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[omni-toastr-component]',
  templateUrl: './omni-toastr.component.html',
  styleUrls: ['./omni-toastr.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        display: 'none',
        opacity: 1
      })),
      transition('void => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ]
})

export class OmniToastrComponent extends Toast implements OnInit {

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    protected ngZone: NgZone,
  ) {
    super(toastrService, toastPackage, ngZone);
  }

  ngOnInit() {
    this.state.value = 'active';
  }
}
