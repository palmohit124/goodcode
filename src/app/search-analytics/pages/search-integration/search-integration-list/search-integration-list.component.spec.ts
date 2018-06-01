import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatPaginatorModule, MatMenuModule, MatRadioModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import { reducers } from '../../../reducers';
import { SearchIntegrationList } from '../../../../models/search-integration';
import { searchIntegrationActions } from '../../../actions';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';

import { SearchIntegrationListComponent } from './search-integration-list.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';

const mockSearchIntegrations: SearchIntegrationList = {
  integrations: [
    {
      id: 's2kUtasd',
      source: 12,
      name: 'google',
      href: 'integration/s2kUtasd'
    },
    {
      id: 'f2adaasF',
      source: 11,
      name: 'bing',
      href: 'integration/f2adaasF'
    }
  ],
  total_items: 2
};

describe('SearchIntegrationListComponent', () => {
  let component: SearchIntegrationListComponent;
  let fixture: ComponentFixture<SearchIntegrationListComponent>;
  let store: Store<any>;

  beforeEach(async(() => {

    const clientConfigServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [
        SearchIntegrationListComponent,
        OmniCardHeaderComponent
      ],
      imports: [
        FormsModule,
        MatMenuModule,
        MatRadioModule,
        MatPaginatorModule,
        MatDialogModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
      ],
      providers: [
        { provide: ClientConfigService, useValue: clientConfigServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(SearchIntegrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchIntegrationListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a search integration load is successful', () => {
    beforeEach(() => { store.dispatch(new searchIntegrationActions.LoadSuccess(mockSearchIntegrations)); });
    it('should get search integration list', () => {
      component.searchIntegrationState$.subscribe(p => expect(p.searchIntegrations).toEqual(mockSearchIntegrations));
    });
  });
});
