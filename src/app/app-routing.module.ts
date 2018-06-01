import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OmniShellComponent, OmniUnauthorizedComponent } from './core/components';
import { OmniOauthRedirectComponent} from './core/components/omni-oauth-redirct/omni-oauth-redirect/omni-oauth-redirect.component';
import { PageNotFoundComponent, ProfileComponent, CustomerListComponent } from './core/pages';
import { AuthGuard, CustomerRouteGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'account',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'me', component: ProfileComponent },
    ],
    component: OmniShellComponent,
  }, {
    path: 'customer',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [CustomerRouteGuard],
        component: CustomerListComponent,
      }
    ],
    component: OmniShellComponent,
  }, {
    path: 'search-analytics',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './search-analytics/search-analytics.module#SearchAnalyticsModule'
      }
    ],
    component: OmniShellComponent,
  },
  {
    path: 'tag-management/:id',
    canActivateChild: [AuthGuard],
    loadChildren: './tag-management/tag-management.module#TagManagementModule'
  },
  { path: 'oauth', component: OmniOauthRedirectComponent},
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'unauthorized', component: OmniUnauthorizedComponent },
  { path: '**', canActivate: [AuthGuard], component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
