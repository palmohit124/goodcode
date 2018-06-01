import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatCardModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TagManagementState, reducers} from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { CreateRuleComponent } from './create-rule.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RefdomListComponent } from './refdom/refdom-list/refdom-list.component';
import { ConditionListComponent } from './condition/condition-list/condition-list.component';
import { LookupListComponent } from './lookup/lookup-list/lookup-list.component';
import { RewriteListComponent } from './rewrite/rewrite-list/rewrite-list.component';
import { SelectSuccess } from '../../../actions/rule-set.actions';

const rule = { graphId: 181765, campaignId: '1', name: 'test rule' };

describe('CreateRuleComponent', () => {
  let component: CreateRuleComponent;
  let fixture: ComponentFixture<CreateRuleComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRuleComponent, RefdomListComponent, ConditionListComponent, LookupListComponent, RewriteListComponent],
      imports: [
        MatCardModule,
        MatDialogModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tagManagement': combineReducers(reducers)
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CreateRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateRuleComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when get rule is successful', () => {
    beforeEach(() => { store.dispatch(new SelectSuccess(rule)); });

    it('should display the ruleId', () => {
      expect(component.ruleId).toEqual(rule.graphId);
    });
  });
});
