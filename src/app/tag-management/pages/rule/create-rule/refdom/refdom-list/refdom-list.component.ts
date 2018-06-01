import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RefdomDialogComponent } from '../refdom-dialog/refdom-dialog.component';
import { CreateRuleWizardComponent } from '../../create-rule-wizard/create-rule-wizard.component';
import { getRefdoms, getSelectedRefdom, TagManagementState, getRulesetState } from '../../../../../reducers';
import { ruleActions } from '../../../../../actions';
import { OmniConfirmationComponent } from '../../../../../../shared/components';

@Component({
  selector: 'omni-refdom-list',
  templateUrl: './refdom-list.component.html',
  styleUrls: ['./refdom-list.component.scss']
})

export class RefdomListComponent implements OnDestroy {
  ruleAttributesSubscription: Subscription;
  refdoms: any;
  selectedRefdom$: Observable<any>;
  deleteDialogSubscription: Subscription;
  selectedRefdom: number = null;

  constructor(public dialog: MatDialog, public store: Store<TagManagementState>) {
    this.ruleAttributesSubscription = this.store.select(getRefdoms).subscribe(state => {
      this.refdoms = state.refdoms;
      if (state.refdoms.length) {
        this.setCurrentRefdom(this.refdoms.find(l => l.graphId === this.selectedRefdom) ? this.refdoms.find(l => l.graphId === this.selectedRefdom) : this.refdoms[0]);
      } else {
        this.store.dispatch(new ruleActions.SelectRefdom(null));
        this.selectedRefdom = null;
      }
    });

    this.selectedRefdom$ = this.store.select(getSelectedRefdom);
  }

  openCreateRuleWizard(data = {}): void {
    data['step'] = 'refdom';
    data['title'] = 'Referring Domain';
    data['progressbarClass'] = 'fill-25';
    data['disabledAny'] = this.refdoms.find(r => r.domain === 'any') ? true : false;
    this.store.select(getRulesetState).subscribe((state) => {
      if (state.selectedRuleset) {
        data['parentId'] = state.selectedRuleset.graphId;
      }
    });
    const dialogRef = this.dialog.open(CreateRuleWizardComponent, {
      data: data
    });
  }

  setCurrentRefdom(refdom) {
    this.selectedRefdom = refdom.graphId;
    this.store.dispatch(new ruleActions.SelectRefdom(refdom.graphId));
  }

  openRefdomDialog(refdom = {}): void {
    const sourcesArr = refdom['sources'] ? refdom['sources'] : [];
    const dialogRef = this.dialog.open(RefdomDialogComponent, {
      data: { graphId: refdom['graphId'], domain: refdom['domain'], sources: sourcesArr, disabledAny: refdom['domain'] !== 'any' && this.refdoms.find(r => r.domain === 'any') ? true : false }
    });
  }

  deleteRefdom(refdom) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete this refdom?',
        content: ''
      }
    });

    this.deleteDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          name: 'refdom',
          graphId: refdom.graphId
        };
        this.store.dispatch(new ruleActions.DeleteRuleAttribute(data));
      }
    });
  }

  ngOnDestroy() {
    if (this.ruleAttributesSubscription) {
      this.ruleAttributesSubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
