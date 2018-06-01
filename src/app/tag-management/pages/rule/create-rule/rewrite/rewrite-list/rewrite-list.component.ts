import { Component, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { RewritesDialogComponent } from '../rewrites-dialog/rewrites-dialog.component';
import { TagManagementState, getRefdoms, getSelectedLookup } from '../../../../../reducers';
import { Subscription } from 'rxjs/Subscription';
import { ruleActions } from '../../../../../actions';
import { CreateRuleWizardComponent } from '../../create-rule-wizard/create-rule-wizard.component';
import { OmniConfirmationComponent } from '../../../../../../shared/components';

@Component({
  selector: 'omni-rewrite-list',
  templateUrl: './rewrite-list.component.html',
  styleUrls: ['./rewrite-list.component.scss']
})
export class RewriteListComponent implements OnDestroy {
  ruleState: any;
  ruleAttributesSubscription: Subscription;
  rewrites: any = [];
  lookupSubscription: Subscription;
  selectedLookup$: Observable<any>;
  selectedRefdomObject: any = [];
  selectedConditionObject: any = [];
  selectedLookupObject: any = [];
  deleteDialogSubscription: Subscription;
  selectedLookup: number = null;

  constructor(public dialog: MatDialog, public store: Store<TagManagementState>) {
    this.ruleAttributesSubscription = this.store.select(getRefdoms).subscribe(state => {
      this.ruleState = state;
      this.prepareData();
    });

    this.selectedLookup$ = this.store.select(getSelectedLookup);

    this.lookupSubscription = this.store.select(getSelectedLookup)
      .subscribe(lookupId => {
        this.selectedLookup = lookupId;
        this.prepareData();
      });
  }

  prepareData() {
    if (this.selectedLookup) {
      _.forEach(this.ruleState.refdoms, (refdom) => {
        this.selectedRefdomObject = { 'domain': refdom.domain, 'sources': refdom.sources };
        _.forEach(refdom.conditions, (condition) => {
          if ((_.find(condition.lookups, { graphId: this.selectedLookup }))) {
            this.rewrites = (_.find(condition.lookups, { graphId: this.selectedLookup })).rewrites;
          }
          this.selectedConditionObject = { 'source': condition.source, 'searchParameters': condition.searchParameters };
          const selectedLookup = _.find(condition.lookups, { graphId: this.selectedLookup });
          if (selectedLookup) {
            this.selectedLookupObject = { 'lookupname': selectedLookup.lookupName };
          }
        });
      });
    } else {
      this.rewrites = [];
    }
  }

  deleteRewrite(rewrite) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete this rewrite?',
        content: ''
      }
    });

    this.deleteDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          name: 'rewrite',
          graphId: rewrite.graphId
        };
        this.store.dispatch(new ruleActions.DeleteRuleAttribute(data));
      }
    });
  }

  openRewritesDialog(rewrite = {}): void {
    const dialogRef = this.dialog.open(RewritesDialogComponent, {
      data: { graphId: rewrite['graphId'], value: rewrite['value'], ctn: rewrite['ctn'] }
    });
  }

  openCreateRuleWizard(data = {}): void {
    data['step'] = 'rewrite';
    data['title'] = 'Rewrite';
    data['progressbarClass'] = 'fill-100';
    data['rulesetObject'] = [];
    data['parentId'] = this.selectedLookup;
    data['rulesetObject']['refdom'] = this.selectedRefdomObject;
    data['rulesetObject']['condition'] = this.selectedConditionObject;
    data['rulesetObject']['lookup'] = this.selectedLookupObject;
    const dialogRef = this.dialog.open(CreateRuleWizardComponent, {
      data: data
    });
  }

  ngOnDestroy() {
    if (this.ruleAttributesSubscription) {
      this.ruleAttributesSubscription.unsubscribe();
    }
    if (this.lookupSubscription) {
      this.lookupSubscription.unsubscribe();
    }
  }
}
