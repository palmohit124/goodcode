import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchAnalyticsSummaryComponent, SearchAccountsDetailComponent, PlatformAccountsDetailComponent, ReportDetailComponent  } from './pages';

const routes: Routes = [
  {
    path: '',
    component: SearchAnalyticsSummaryComponent,
  },
  {
    path: 'search-account',
    component: SearchAccountsDetailComponent
  },
  {
    path: 'platform-account',
    component: PlatformAccountsDetailComponent
  },
  {
    path: 'report',
    component: ReportDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchAnalyticsRoutingModule { }
