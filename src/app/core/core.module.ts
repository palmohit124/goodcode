import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { OmniFooterComponent, OmniShellComponent, OmniSidenavComponent, OmniToolbarComponent, OmniToastrComponent, OmniProgressSpinnerComponent, OmniUnauthorizedComponent } from './components';
import { SharedModule } from '../shared/shared.module';

import { metaReducers, reducers } from './reducers';

import { AuthEffects, provideBootstrapEffects, UserProfileEffects, CustomerEffects } from './effects';

import { PageNotFoundComponent, ProfileComponent, CustomerListComponent, CreateCustomerModalComponent, EditCustomerModalComponent } from './pages';

import { AuthGuard, CustomerRouteGuard } from './guards';

import { AuthService } from './services/auth/auth.service';
import { CustomerService } from './services/customer/customer.service';
import { LOCAL_STORAGE_PROVIDER, LocalStorage } from './services/local-storage/local-storage';
import { ClientConfigService, CONFIGURATION_INITIALIZER } from './services/client-config/client-config.service';
import { Clock } from './services/clock/clock';
import { Logger, LOGGER_OPTIONS, loggerFactory } from './services/logger';
import { CustomRouterStateSerializer } from './services/router-serializer/router-serializer';
import { ToastService } from './services/toastr/toast.service';
import { TimeZoneService } from './services/time-zone/time-zone.service';

import { POPUP_FACTORY_PROVIDER } from './providers/popup-factory.provider';
import { WINDOW_PROVIDER } from './providers/window-ref.provider';
import { OmniOauthRedirectComponent } from './components/omni-oauth-redirct/omni-oauth-redirect/omni-oauth-redirect.component';
import { HttpServiceInterceptor } from '../shared/interceptor/http-service-interceptor';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    OmniFooterComponent,
    OmniShellComponent,
    OmniToolbarComponent,
    OmniSidenavComponent,
    PageNotFoundComponent,
    ProfileComponent,
    CustomerListComponent,
    CreateCustomerModalComponent,
    EditCustomerModalComponent,
    OmniToastrComponent,
    OmniOauthRedirectComponent,
    OmniProgressSpinnerComponent,
    OmniUnauthorizedComponent
  ],
  exports: [
    OmniShellComponent,
    OmniOauthRedirectComponent,
    OmniProgressSpinnerComponent
  ],
  entryComponents: [
    CreateCustomerModalComponent,
    EditCustomerModalComponent,
    OmniToastrComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import if in the root module of your application.');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootCoreModule,
      providers: [
        CONFIGURATION_INITIALIZER,
        provideBootstrapEffects([
          AuthEffects,
          UserProfileEffects,
          CustomerEffects
        ]),
        ClientConfigService,
        AuthGuard,
        CustomerRouteGuard,
        AuthService,
        CustomerService,
        Clock,
        LocalStorage,
        ToastService,
        TimeZoneService,
        { provide: Logger, useFactory: loggerFactory, deps: [[new Inject(LOGGER_OPTIONS), new Optional()]] },
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        LOCAL_STORAGE_PROVIDER,
        POPUP_FACTORY_PROVIDER,
        WINDOW_PROVIDER,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpServiceInterceptor,
          multi: true
        }
      ],
    };
  }

}

@NgModule({
  imports: [
    CoreModule,
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    ToastrModule.forRoot({
      toastComponent: OmniToastrComponent,
      positionClass: 'toast-bottom-right',
      tapToDismiss: false,
    }),
  ],
  exports: [CoreModule],
})
export class RootCoreModule {
}
