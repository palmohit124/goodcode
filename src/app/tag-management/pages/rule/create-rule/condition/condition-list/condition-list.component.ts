import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ConditionsDialogComponent } from '../conditions-dialog/conditions-dialog.component';
import { CreateRuleWizardComponent } from '../../create-rule-wizard/create-rule-wizard.component';
import { TagManagementState, getRefdoms, getSelectedRefdom, getSelectedCondition } from '../../../../../reducers';
import { ruleActions } from '../../../../../actions';
import { OmniConfirmationComponent } from '../../../../../../shared/components';

@Component({
  selector: 'omni-condition-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.scss']
})
export class ConditionListComponent implements OnDestroy {
  selectedRefdomSubscription: Subscription;
  ruleState: any;
  ruleSubscription: Subscription;
  selectedCondition$: Observable<any>;
  selectedRefdom$: Observable<any>;
  conditions: any = [];
  selectedRefdomObject: any = [];
  deleteDialogSubscription: Subscription;
  selectedRefdom: number = null;
  selectedCondition: number = null;
  conditionData: object;

  constructor(public dialog: MatDialog, public store: Store<TagManagementState>) {
    this.ruleSubscription = this.store.select(getRefdoms)
      .filter(state => state.refdoms.length > 0)
      .subscribe(state => {
        this.ruleState = state;
        this.prepareData();
      });

    this.selectedCondition$ = this.store.select(getSelectedCondition);
    this.selectedRefdom$ = this.store.select(getSelectedRefdom);

    this.selectedRefdomSubscription = this.store.select(getSelectedRefdom)
      .subscribe(refdomId => {
        this.selectedRefdom = refdomId;
        this.prepareData();
      });
  }

  prepareData() {
    if (this.selectedRefdom && this.ruleState.refdoms) {
      this.ruleState.refdoms.find(r => {
        if (r.graphId === this.selectedRefdom) {
          this.selectedRefdomObject = { 'domain': r.domain, 'sources': r.sources };
          this.conditions = r.conditions;
          if (r.conditions.length) {
            this.setCurrentCondition(this.conditions.find(l => l.graphId === this.selectedCondition) ? this.conditions.find(l => l.graphId === this.selectedCondition) : this.conditions[0]);
          } else {
            this.store.dispatch(new ruleActions.SelectCondition(null));
            this.selectedCondition = null;
          }
        }
      });
    } else {
      this.store.dispatch(new ruleActions.SelectCondition(null));
      this.selectedCondition = null;
      this.conditions = [];
    }
  }

  translateSource(source) {
    if (source === 'cookie') {
      return 'Cookie';
    } else if (source === 'url') {
      return 'Url Parameter';
    } else if (source === 'css') {
      return 'CSS';
    }
  }

  setCurrentCondition(condition) {
    this.selectedCondition = condition.graphId;
    this.store.dispatch(new ruleActions.SelectCondition(condition.graphId));
  }

  openConditionsDialog(condition = {}): void {
    if (condition['value'] === 'css') {
      this.conditionData = { graphId: condition['graphId'], source: condition['source'] };
    } else {
      this.conditionData = { graphId: condition['graphId'], searchParameters: condition['searchParameters'], source: condition['source'] };
    }

    const conditionData = this.conditionData;
    conditionData['disabledSources'] =  this.disabledSources();
    const dialogRef = this.dialog.open(ConditionsDialogComponent, {
      data: this.conditionData
    });
  }

  openCreateRuleWizard(data = {}): void {
    data['step'] = 'condition';
    data['title'] = 'Condition';
    data['progressbarClass'] = 'fill-50';
    data['rulesetObject'] = [];
    data['parentId'] = this.selectedRefdom;
    data['rulesetObject']['refdom'] = this.selectedRefdomObject;
    data['disabledSources'] =  this.disabledSources();
    const dialogRef = this.dialog.open(CreateRuleWizardComponent, {
      data: data
    });
  }

  deleteCondition(condition) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete this condition?',
        content: ''
      }
    });

    this.deleteDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          name: 'conditions',
          graphId: condition.graphId
        };
        this.store.dispatch(new ruleActions.DeleteRuleAttribute(data));
      }
    });
  }

  disabledSources() {
    const sources: string[] = [];
    if (this.conditions.find(c => c.source === 'css')) {
      sources.push('css');
    }
    if (this.conditions.find(c => c.source === 'cookie')) {
      sources.push('cookie');
    }
    return sources;

  }

  ngOnDestroy() {
    if (this.ruleSubscription) {
      this.ruleSubscription.unsubscribe();
    }
    if (this.selectedRefdomSubscription) {
      this.selectedRefdomSubscription.unsubscribe();
    }
  }
}
