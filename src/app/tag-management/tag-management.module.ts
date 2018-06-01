import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ClipboardModule } from 'ngx-clipboard';
import { HighlightModule } from 'ngx-highlightjs';
import { SharedModule } from '../shared/shared.module';
import { TagManagementRoutingModule } from './tag-management-routing.module';
import {
  TagShellComponent,
  TagToolbarComponent,
  TagSidebarComponent
} from './components';

import {
  RuleListComponent,
  CreateRuleComponent,
  ConditionListComponent,
  ConditionsDialogComponent,
  LookupListComponent,
  RefdomListComponent,
  RefdomDialogComponent,
  RewriteListComponent,
  RewritesDialogComponent,
  CodeSnippetModalComponent,
  TagFeaturesModalComponent,
  CreateRuleDialogComponent,
  CreateRuleWizardComponent
} from './pages';
import { reducers } from './reducers';
import { RulesetEffects, TagFeaturesEffects, RuleEffects, RewriteCampaignEffects } from './effects';
import { TagFeaturesService } from './services/tag-features/tag-features.service';
import { TagScriptService } from './services/tag-script-snippet/tag-script.service';
import { RulesetService } from './services/rule-set/rule-set.service';
import { RuleAttributeService } from './services/rule-attribute/rule-attribute.service';
import { RewriteCampaignService } from './services/rewrite-campaign/rewrite-campaign.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpServiceInterceptor } from '../shared/interceptor/http-service-interceptor';

@NgModule({
  imports: [
    SharedModule,
    TagManagementRoutingModule,
    ClipboardModule,
    HighlightModule.forRoot({ theme: 'agate' }),
    StoreModule.forFeature('tagManagement', reducers),
    EffectsModule.forFeature([RulesetEffects, TagFeaturesEffects, RuleEffects, RewriteCampaignEffects])
  ],
  providers: [RulesetService, TagFeaturesService, RuleAttributeService, TagScriptService, RewriteCampaignService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpServiceInterceptor,
      multi: true
    }
  ],
  declarations: [
    TagShellComponent,
    TagToolbarComponent,
    TagSidebarComponent,
    RuleListComponent,
    CreateRuleComponent,
    RefdomDialogComponent,
    ConditionsDialogComponent,
    RewritesDialogComponent,
    CodeSnippetModalComponent,
    TagFeaturesModalComponent,
    CreateRuleDialogComponent,
    ConditionListComponent,
    LookupListComponent,
    RefdomListComponent,
    RewriteListComponent,
    CreateRuleWizardComponent
  ],
  entryComponents: [RefdomDialogComponent, ConditionsDialogComponent,
    RewritesDialogComponent, TagSidebarComponent, CodeSnippetModalComponent,
    TagFeaturesModalComponent, CreateRuleDialogComponent,
    CreateRuleWizardComponent
  ]
})
export class TagManagementModule { }
