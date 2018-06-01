import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatCardModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TagManagementState, reducers} from '../../../../../reducers';
import * as fromRoot from '../../../../../../core/reducers';
import { RefdomListComponent } from './refdom-list.component';
import {LoadSuccess, SelectRefdom} from '../../../../../actions/rule.actions';

const refdoms = [
  {
    graphId: 181241,
    conditions: []
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

describe('RefdomListComponent', () => {
  let component: RefdomListComponent;
  let fixture: ComponentFixture<RefdomListComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefdomListComponent ],
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
    fixture = TestBed.createComponent(RefdomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RefdomListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when get refdoms is successful', () => {
    beforeEach(() => { store.dispatch(new LoadSuccess( { refdoms } )); });

    it('should display the refdoms', () => {
      expect(component.refdoms).toEqual(refdoms);
      expect(component.refdoms.length).toEqual(refdoms.length);
    });

    it('should display the selected refdom', () => {
      expect(component.selectedRefdom).toEqual(181241);
    });
  });
});
