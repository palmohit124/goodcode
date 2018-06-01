import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatPaginatorModule, MatMenuModule, MatRadioModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchAccountList } from '../../../../models/search-account';
import { searchAccountActions } from '../../../actions';
import * as fromRoot from '../../../../core/reducers';
import { reducers } from '../../../reducers';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';

import { SearchAccountsDetailComponent } from './search-accounts-detail.component';
import { SearchIntegrationListComponent } from '../../search-integration/search-integration-list/search-integration-list.component';
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

describe('SearchAccountsDetailComponent', () => {
  let component: SearchAccountsDetailComponent;
  let fixture: ComponentFixture<SearchAccountsDetailComponent>;
  let store: Store<any>;

  beforeEach(async(() => {

    const clientConfigServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [
        SearchAccountsDetailComponent,
        OmniCardHeaderComponent,
        OmniSearchComponent,
        SearchIntegrationListComponent
      ],
      imports: [
        FormsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatMenuModule,
        MatRadioModule,
        MatCheckboxModule,
        MatCardModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ClientConfigService, useValue: clientConfigServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(SearchAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchAccountsDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a search account load is successful', () => {
    beforeEach(() => { store.dispatch(new searchAccountActions.LoadSuccess(mockSearchAccounts)); });
    it('should get unlink search accounts', () => {
      component.searchAccountState$.subscribe(p => expect(p.searchAccounts).toEqual(mockSearchAccounts));
    });
  });

});
