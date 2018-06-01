import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  TagShellComponent,
 } from './components';

 import {
   RuleListComponent,
   CreateRuleComponent
} from './pages';
const routes: Routes = [
  {
    path: '',
    component: TagShellComponent,
    children: [
      {
        path: '',
        component: RuleListComponent
      },
      {
        path: 'rule',
        component: CreateRuleComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagManagementRoutingModule { }
