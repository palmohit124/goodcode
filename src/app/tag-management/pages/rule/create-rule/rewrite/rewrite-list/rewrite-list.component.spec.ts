import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatCardModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TagManagementState, reducers} from '../../../../../reducers';
import * as fromRoot from '../../../../../../core/reducers';
import { SelectRefdom, SelectCondition, SelectLookup } from '../../../../../actions/rule.actions';
import { RewriteListComponent } from './rewrite-list.component';

const refdoms = [
  {
    graphId: 181241,
    conditions: [
      {
        graphId: 181245,
        lookups: [
          {
            graphId: 181246,
            rewrites: [ { graphId: 181247 } ]
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

describe('RewriteListComponent', () => {
  let component: RewriteListComponent;
  let fixture: ComponentFixture<RewriteListComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewriteListComponent ],
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
    fixture = TestBed.createComponent(RewriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RewriteListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when get rewrites is successful', () => {
    beforeEach(() => { component.ruleState = { refdoms }; });
    beforeEach(() => { store.dispatch(new SelectRefdom(181241)); });
    beforeEach(() => { store.dispatch(new SelectCondition(181245)); });
    beforeEach(() => { store.dispatch(new SelectLookup(181246)); });

    it('should display the rewrites', () => {
      expect(component.rewrites).toEqual(refdoms[0].conditions[0].lookups[0].rewrites);
      expect(component.rewrites.length).toEqual(refdoms[0].conditions[0].lookups[0].rewrites.length);
    });
  });
});
