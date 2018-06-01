import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatPaginatorModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { SearchAccountList } from '../../../../models/search-account';
import { searchAccountActions } from '../../../actions';

import { SearchAccountsCardContentComponent } from './search-accounts-card-content.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { OmniSearchComponent } from '../../../../shared/components';

const mockSearchAccounts: SearchAccountList = {
  accounts: [
    {
      source: 'bing',
      sourceId: 32,
      name: 'account 1',
      number: 'number 1',
      integrationId: 12,
      linked: true,
      href: 'account/32'
    },
    {
      source: 'google',
      sourceId: 51,
      name: 'account 2',
      integrationId: 12,
      linked: true,
      href: 'account/51'
    }
  ],
  total_items: 2
};

describe('SearchAccountsCardContentComponent', () => {
  let component: SearchAccountsCardContentComponent;
  let fixture: ComponentFixture<SearchAccountsCardContentComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAccountsCardContentComponent, OmniCardHeaderComponent, OmniSearchComponent],
      imports: [
        MatDialogModule,
        MatPaginatorModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
        RouterTestingModule,
        ReactiveFormsModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(SearchAccountsCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchAccountsCardContentComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a search account load is successful', () => {
    beforeEach(() => { store.dispatch(new searchAccountActions.LoadSuccess(mockSearchAccounts)); });
    it('should get unlink search accounts', () => {
      component.searchAccountState$.subscribe(p => expect(p.searchAccounts).toEqual(mockSearchAccounts));
    });
  });

});
