import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatCardModule, MatFormFieldModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TagManagementState, reducers} from '../../../../../reducers';
import * as fromRoot from '../../../../../../core/reducers';
import { SelectRefdom, SelectCondition, SelectLookup } from '../../../../../actions/rule.actions';
import { LookupListComponent } from './lookup-list.component';

const refdoms = [
  {
    graphId: 181241,
    conditions: [
      {
        graphId: 181245,
        lookups: [
          {
            graphId: 181246,
            rewrites: []
          }
        ]
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

describe('LookupListComponent', () => {
  let component: LookupListComponent;
  let fixture: ComponentFixture<LookupListComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupListComponent ],
      imports: [
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
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
    fixture = TestBed.createComponent(LookupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LookupListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when get lookups is successful', () => {
    beforeEach(() => { component.ruleState = { refdoms }; });
    beforeEach(() => { store.dispatch(new SelectRefdom(181241)); });
    beforeEach(() => { store.dispatch(new SelectCondition(181245)); });
    beforeEach(() => { store.dispatch(new SelectLookup(181246)); });

    it('should display the lookups', () => {
      expect(component.lookups).toEqual(refdoms[0].conditions[0].lookups);
      expect(component.lookups.length).toEqual(refdoms[0].conditions[0].lookups.length);
    });

    it('should display the selected lookup', () => {
      expect(component.selectedLookup).toEqual(181246);
    });
  });
});
