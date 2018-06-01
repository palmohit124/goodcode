import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CreateRuleDialogComponent } from '../create-rule/create-rule-dialog/create-rule-dialog.component';
import { CodeSnippetModalComponent } from '../code-snippet-modal/code-snippet-modal.component';
import { TagFeaturesModalComponent } from '../tag-features-modal/tag-features-modal.component';
import { TagManagementState, ruleset, getRulesetState, getRewriteCampaigns, getAccount, getRulesetActionStatus } from '../../../reducers';
import { rulesetActions } from '../../../actions';
import { Rule } from '../../../../models/rule-set';
import { OmniConfirmationComponent } from '../../../../shared/components';
import { RewriteCampaignList, EmptyRewriteCampaignList } from '../../../../models/rewrite-campaign';

@Component({
  selector: 'omni-tag-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RuleListComponent implements OnInit, OnDestroy {
  accountId: string;
  deleteRuleDialogRefSubscription: Subscription;
  limit: number = 10;
  offset: number = 0;
  term = new FormControl();
  rulesetState$: Observable<ruleset.RulesetState>;
  accountSubscription: Subscription;
  rewriteCampaignSubscription: Subscription;
  rewriteCampaigns: RewriteCampaignList = EmptyRewriteCampaignList;
  rulesetActionSubscription: Subscription;

  constructor(public dialog: MatDialog,
    private router: Router,
    private store: Store<TagManagementState>) {
    this.rulesetState$ = this.store.select(getRulesetState);

    this.accountSubscription = this.store.select(getAccount)
      .filter(state => state !== null)
      .subscribe((state) => {
        this.accountId = state;
      });

    this.rewriteCampaignSubscription = this.store.select(getRewriteCampaigns).subscribe(campaigns => this.rewriteCampaigns = campaigns);

    this.term.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => {
        this.offset = 0;
        this.loadRulesetList();
      });

    this.rulesetActionSubscription = this.store.select(getRulesetActionStatus)
      .filter(status => status)
      .subscribe(status => {
        this.offset = 0;
        if (!this.term.value) {
          this.loadRulesetList();
        } else {
          this.term.setValue('');
        }
      });
  }

  ngOnInit() {

  }

  public paginate(event) {
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.loadRulesetList();
  }

  loadRulesetList() {
    const queryParam = {
      offset: this.offset,
      limit: this.limit
    };
    if (this.term.value) {
      queryParam['name'] = this.term.value.trim();
    }
    this.store.dispatch(new rulesetActions.Load(this.accountId, queryParam));
  }

  public openCodeSnippetModal() {
    const codeSnippetDialogRef = this.dialog.open(CodeSnippetModalComponent);
  }

  public openTagFeaturesModal() {
    const tagFeaturesDialogRef = this.dialog.open(TagFeaturesModalComponent);
  }

  public openCreateRuleDialog(): void {
    const createRuleDialogRef = this.dialog.open(CreateRuleDialogComponent);
  }

  public deleteConfirmation(rule) {
    const deleteConfirmDialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure to delete rule?',
        content: rule.name
      }
    });

    this.deleteRuleDialogRefSubscription = deleteConfirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new rulesetActions.Delete(rule.graphId));
      }
    });
  }

  selectRule(selectedRule: Rule) {
    this.store.dispatch(new rulesetActions.Select(selectedRule));
    const url = 'tag-management/' + this.accountId + '/rule/';
    this.router.navigate([url]);
  }

  getCmapignName(campaignId) {
    return this.rewriteCampaigns.campaigns.find(c => c.campaignId === campaignId) ?
      this.rewriteCampaigns.campaigns.find(c => c.campaignId === campaignId).campaignName : '';
  }

  ngOnDestroy() {
    if (this.deleteRuleDialogRefSubscription) {
      this.deleteRuleDialogRefSubscription.unsubscribe();
    }

    if (this.rewriteCampaignSubscription) {
      this.rewriteCampaignSubscription.unsubscribe();
    }

    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }

    if (this.rulesetActionSubscription) {
      this.rewriteCampaignSubscription.unsubscribe();
    }
  }
}
