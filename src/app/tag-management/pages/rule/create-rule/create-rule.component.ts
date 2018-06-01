import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CreateRuleDialogComponent } from '../create-rule/create-rule-dialog/create-rule-dialog.component';
import { getRulesetState, TagManagementState, getRuleActionStatus, getSelectedRule } from '../../../reducers';
import { rulesetActions, ruleActions } from '../../../actions';
import { OmniConfirmationComponent } from '../../../../shared/components';

@Component({
  selector: 'omni-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateRuleComponent implements OnInit, OnDestroy {

  accountId: string;
  ruleName: string;
  ruleNameSelection: string;
  limit: number = 20;
  offset: number = 0;
  ruleSubscription: Subscription;
  selectedRuleSubscription: Subscription;
  ruleActionSubscription: Subscription;
  ruleSet: Array<Object> = [];
  ruleCtrl = new FormControl();
  ruleId: number = null;

  constructor(public dialog: MatDialog,
    private store: Store<TagManagementState>) {

    this.selectedRuleSubscription = this.store.select(getSelectedRule)
      .filter(rule => rule !== null)
      .subscribe(rule => {
        this.store.dispatch(new ruleActions.Load(rule.graphId));
        this.ruleId = rule.graphId;
        this.ruleName = rule.name;
        this.ruleNameSelection = rule.name;
      });

    this.ruleSubscription = this.store.select(getRulesetState)
      .subscribe((state) => {
        this.ruleSet = [];
        if (state.rulesets.rules) {
          this.ruleSet = state.rulesets.rules;
        }
        if (state.accountId) {
          this.accountId = state.accountId;
        }
      });

    this.ruleActionSubscription = this.store.select(getRuleActionStatus)
      .filter(state => state)
      .subscribe(state => {
        this.store.dispatch(new ruleActions.Load(this.ruleId));
      });

    this.ruleCtrl.valueChanges
      .debounceTime(10)
      .distinctUntilChanged()
      .subscribe(term => this.loadRulesetList());
  }

  ngOnInit() {
  }

  resetRuleList(event) {
    if (!event && this.ruleCtrl.value) {
      this.ruleCtrl.setValue('');
    }
  }

  loadRulesetList() {
    const queryParam = {
      offset: this.offset,
      limit: this.limit
    };
    if (this.ruleCtrl.value) {
      queryParam['name'] = this.ruleCtrl.value.trim();
    }
    this.store.dispatch(new rulesetActions.Load(this.accountId, queryParam));
  }

  openCreateRuleDialog(): void {
    const createRuleDialogRef = this.dialog.open(CreateRuleDialogComponent);
  }

  openRuleDialog(rule) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are You Sure Want To Change Rule?',
        content: this.ruleName
      }
    });

    dialogRef.afterClosed().subscribe(changeRule => {
      if (changeRule) {
        this.store.dispatch(new rulesetActions.Select(rule));
      } else {
        this.ruleNameSelection = this.ruleName;
      }
    });
  }

  ngOnDestroy() {
    if (this.selectedRuleSubscription) {
      this.selectedRuleSubscription.unsubscribe();
    }

    if (this.ruleSubscription) {
      this.ruleSubscription.unsubscribe();
    }

    if (this.ruleActionSubscription) {
      this.ruleActionSubscription.unsubscribe();
    }

  }

}
