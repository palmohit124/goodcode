import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatCardModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TagManagementState, reducers} from '../../../../../reducers';
import * as fromRoot from '../../../../../../core/reducers';
import { SelectRefdom, SelectCondition } from '../../../../../actions/rule.actions';
import { ConditionListComponent } from './condition-list.component';

const refdoms = [
  {
    graphId: 181241,
    conditions: [
      {
        graphId: 181245,
        lookups: []
      }
    ]
  },
  {
    graphId: 181242,
    conditions: []
  },
  {
    graphId: 181243,
    conditions: []
  },
];

describe('ConditionListComponent', () => {
  let component: ConditionListComponent;
  let fixture: ComponentFixture<ConditionListComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionListComponent ],
      imports: [
        MatCardModule,
        MatDialogModule,
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
    fixture = TestBed.createComponent(ConditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ConditionListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when get conditions is successful', () => {
    beforeEach(() => { component.ruleState = { refdoms }; });
    beforeEach(() => { store.dispatch(new SelectRefdom(181241)); });
    beforeEach(() => { store.dispatch(new SelectCondition(181245)); });

    it('should display the conditions', () => {
      expect(component.conditions).toEqual(refdoms[0].conditions);
      expect(component.conditions.length).toEqual(refdoms[0].conditions.length);
    });

    it('should display the selected condition', () => {
      expect(component.selectedCondition).toEqual(181245);
    });
  });
});
