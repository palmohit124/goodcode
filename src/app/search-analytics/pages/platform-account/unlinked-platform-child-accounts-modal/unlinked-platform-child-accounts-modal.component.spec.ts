import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatPaginatorModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { platformAccountActions } from '../../../actions';
import * as platformAccount from '../../../../models/platform-account';

import { UnlinkedPlatformChildAccountsModalComponent } from './unlinked-platform-child-accounts-modal.component';
import { OmniSearchComponent } from '../../../../shared/components';

const mockUnlinkChildAccount: platformAccount.UnlinkedChildAccounts = {
  'children': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

describe('UnlinkedPlatformChildAccountsModalComponent', () => {
  let component: UnlinkedPlatformChildAccountsModalComponent;
  let fixture: ComponentFixture<UnlinkedPlatformChildAccountsModalComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlinkedPlatformChildAccountsModalComponent, OmniSearchComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [
        MatCheckboxModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(UnlinkedPlatformChildAccountsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UnlinkedPlatformChildAccountsModalComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a unlinked child platform account load is successful', () => {
    beforeEach(() => { store.dispatch(new platformAccountActions.LoadUnlinkedChildSuccess(mockUnlinkChildAccount)); });
    it('should get  unlinked child platform accounts', () => {
      component.platformAccountState$.subscribe(p => expect(p.unlinkedChildAccounts).toEqual(mockUnlinkChildAccount));
    });
  });
});
