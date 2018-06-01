import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { RuleListComponent } from './rule-list.component';
import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadSuccess } from '../../../actions/rule-set.actions';
import { rulesetActions } from '../../../actions';
import { RuleSet } from '../../../../models/rule-set';
import { TagManagementState} from '../../../reducers';
import { RulesetService } from '../../../services/rule-set/rule-set.service';

const mockRulesets: RuleSet = {
  'rules': [
    {
      'graphId': 1394798,
      'name': 'Rule1',
      'campaignId': '67GH424F2'
    },
    {
      'graphId': 1394800,
      'name': 'wfwe',
      'campaignId': '67GHER424F256'
    },
    {
      'graphId': 1394858,
      'name': 'test',
      'campaignId': '89FR424K9'
    },
    {
      'graphId': 1394871,
      'name': 'weff',
      'campaignId': 'ADSF56DSFHH424O0'
    }
  ]
  ,
  total_items: 4
};
describe('RuleListComponent', () => {
  let component: RuleListComponent;
  let fixture: ComponentFixture<RuleListComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    const rulesetServiceeStub = {};
    TestBed.configureTestingModule({
      declarations: [RuleListComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatDialogModule,
        MatPaginatorModule,
        MatCardModule,
        MatTooltipModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tagManagement': combineReducers(reducers)
        })
      ],
      providers: [
        { provide: RulesetService, useValue: rulesetServiceeStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(RuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RuleListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a rule-set list load is successful', () => {
    beforeEach(() => { store.dispatch(new rulesetActions.LoadSuccess(mockRulesets)); });
    it('should get rule-set list', () => {
      component.rulesetState$.subscribe(p => expect(p.rulesets).toEqual(mockRulesets));
    });
  });
});
