import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
// noinspection TsLint
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  navigatedTo: any = null;

  @Input('routerLink') routerLink: any;

  @HostBinding('click')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}
