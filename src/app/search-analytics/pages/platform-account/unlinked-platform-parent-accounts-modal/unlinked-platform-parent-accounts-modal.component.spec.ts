import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRadioModule, MatPaginatorModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { platformAccountActions } from '../../../actions';
import * as platformAccount from '../../../../models/platform-account';

import { UnlinkedPlatformParentAccountsModalComponent } from './unlinked-platform-parent-accounts-modal.component';
import { OmniSearchComponent } from '../../../../shared/components';

const mockUnlinkParentAccount: platformAccount.UnlinkedParentAccounts = {
  'parents': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 2',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

describe('UnlinkedPlatformParentAccountsModalComponent', () => {
  let component: UnlinkedPlatformParentAccountsModalComponent;
  let fixture: ComponentFixture<UnlinkedPlatformParentAccountsModalComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnlinkedPlatformParentAccountsModalComponent, OmniSearchComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [
        FormsModule,
        MatRadioModule,
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
    fixture = TestBed.createComponent(UnlinkedPlatformParentAccountsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UnlinkedPlatformParentAccountsModalComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a unlinked parent platform account load is successful', () => {
    beforeEach(() => { store.dispatch(new platformAccountActions.LoadUnlinkedParentSuccess(mockUnlinkParentAccount)); });
    it('should get unlinked parents platform accounts', () => {
      component.platformAccountState$.subscribe(p => expect(p.unlinkedParentAccounts).toEqual(mockUnlinkParentAccount));
    });
  });
});
