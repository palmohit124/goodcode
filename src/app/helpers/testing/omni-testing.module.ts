import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterLinkStubDirective} from './router-link-stub';
import {OmniToolbarStubComponent} from './omni-toolbar-stub';
import {OmniFooterStubComponent} from './omni-footer-stub';
import {BlankComponent} from './blank.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import {MockActivatedRouteSnapshot} from './mock-activated-route-snapshot';
import {OmniSidenavStubComponent} from './omni-sidenav-stub';

@NgModule({
  declarations: [
    BlankComponent,
    OmniToolbarStubComponent,
    OmniFooterStubComponent,
    OmniSidenavStubComponent,
    RouterLinkStubDirective,
  ],
  imports: [SharedModule],
  exports: [
    BlankComponent,
    OmniToolbarStubComponent,
    OmniFooterStubComponent,
    OmniSidenavStubComponent,
    RouterLinkStubDirective,
  ],
})
export class OmniTestingModule {
}
