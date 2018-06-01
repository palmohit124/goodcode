import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { TagManagementState, getRefdoms, getSelectedCondition, getSelectedRefdom, getSelectedLookup } from '../../../../../reducers';
import { ruleActions } from '../../../../../actions';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { CreateRuleWizardComponent } from '../../create-rule-wizard/create-rule-wizard.component';
import { OmniConfirmationComponent } from '../../../../../../shared/components';

@Component({
  selector: 'omni-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.scss']
})
export class LookupListComponent implements OnDestroy {
  ruleSubscription: Subscription;
  ruleState: any;
  lookups: any = [];
  selectedLookup$: Observable<any>;
  selectedCondition$: Observable<any>;
  conditionSubscription: Subscription;
  updateLookupData: object = {};
  isEditLookupMode: Array<boolean> = [];
  selectedRefdomObject: any = [];
  selectedConditionObject: any = [];
  deleteDialogSubscription: Subscription;
  selectedCondition: number = null;
  selectedLookup: number = null;

  constructor(public dialog: MatDialog, public store: Store<TagManagementState>) {
    this.ruleSubscription = this.store.select(getRefdoms).subscribe(state => {
      this.ruleState = state;
      this.prepareData();
    });

    this.selectedCondition$ = this.store.select(getSelectedCondition);
    this.selectedLookup$ = this.store.select(getSelectedLookup);

    this.conditionSubscription = this.store.select(getSelectedCondition)
      .subscribe(conditionId => {
        this.selectedCondition = conditionId;
        this.prepareData();
      });
  }

  prepareData() {
    if (this.selectedCondition) {
      this.ruleState.refdoms.map(refdom => {
        this.selectedRefdomObject = { 'domain': refdom.domain, 'sources': refdom.sources };
        const selectedCondition = _.find(refdom.conditions, { 'graphId': this.selectedCondition });
        if (selectedCondition) {
          this.selectedConditionObject = { 'source': selectedCondition.source, 'searchParameters': selectedCondition.searchParameters };
        }

        if (refdom.conditions.find(c => c.graphId === this.selectedCondition)) {
          this.lookups = refdom.conditions.find(c => c.graphId === this.selectedCondition).lookups;
        }

      });
      if (this.lookups.length) {
        this.setCurrentLookup(this.lookups.find(l => l.graphId === this.selectedLookup) ? this.lookups.find(l => l.graphId === this.selectedLookup) : this.lookups[0]);
      } else {
        this.store.dispatch(new ruleActions.SelectLookup(null));
        this.selectedLookup = null;
      }
    } else {
      this.store.dispatch(new ruleActions.SelectLookup(null));
      this.selectedLookup = null;
      this.lookups = [];
    }
  }

  setCurrentLookup(lookup) {
    this.selectedLookup = lookup.graphId;
    this.store.dispatch(new ruleActions.SelectLookup(lookup.graphId));
  }

  updateLookupName(lookupname, graphId, index) {
    this.isEditLookupMode[index] = false;
    this.updateLookupData['lookupName'] = lookupname;
    this.store.dispatch(new ruleActions.EditRuleAttribute(graphId, 'lookup', this.updateLookupData));
  }

  openCreateRuleWizard(data = {}): void {
    data['step'] = 'lookup';
    data['title'] = 'Lookup';
    data['progressbarClass'] = 'fill-75';
    data['rulesetObject'] = [];
    data['parentId'] = this.selectedCondition;
    data['rulesetObject']['refdom'] = this.selectedRefdomObject;
    data['rulesetObject']['condition'] = this.selectedConditionObject;
    const dialogRef = this.dialog.open(CreateRuleWizardComponent, {
      data: data
    });
  }

  deleteLookup(lookup) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete this lookup?',
        content: ''
      }
    });

    this.deleteDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          name: 'lookup',
          graphId: lookup.graphId
        };
        this.store.dispatch(new ruleActions.DeleteRuleAttribute(data));
      }
    });
  }

  ngOnDestroy() {
    if (this.ruleSubscription) {
      this.ruleSubscription.unsubscribe();
    }
    if (this.conditionSubscription) {
      this.conditionSubscription.unsubscribe();
    }
  }
}
