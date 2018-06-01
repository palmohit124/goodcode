import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { platformAccountActions } from '../../../actions';
import * as platformAccount from '../../../../models/platform-account';

import { PlatformAccountsCardContentComponent } from './platform-accounts-card-content.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { OmniSearchComponent } from '../../../../shared/components';


const mockLinkedPlatformAccounts: platformAccount.LinkedPlatformAccounts = {
  'parent': {
    'platformId': '12F2504S1',
    'name': 'Account Name',
    'parentId': null,
    'href': '/account/admin?acc=12F2504S1'
  },
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

describe('PlatformAccountsCardContentComponent', () => {
  let component: PlatformAccountsCardContentComponent;
  let fixture: ComponentFixture<PlatformAccountsCardContentComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformAccountsCardContentComponent, OmniCardHeaderComponent, OmniSearchComponent ],
      imports: [
        MatPaginatorModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(PlatformAccountsCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchAccountsCardContentComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a linked platform account load is successful', () => {
    beforeEach(() => { store.dispatch(new platformAccountActions.LoadLinkedSuccess(mockLinkedPlatformAccounts)); });
    it('should get linked platform accounts', () => {
      component.platformAccountState$.subscribe(p => expect(p.linkedAccounts).toEqual(mockLinkedPlatformAccounts));
    });
  });
});
