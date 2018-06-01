import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatPaginatorModule } from '@angular/material';

import * as fromRoot from '../../../../core/reducers';
import { reducers } from '../../../reducers';

import { SearchCampaignsCardComponent } from './search-campaigns-card.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { OnboardCampaignComponent, OnboardStatusComponent } from '../../../pages';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';
import { WindowRef } from '../../../../core/providers/window-ref.provider';

describe('SearchCampaignsCardComponent', () => {
  let component: SearchCampaignsCardComponent;
  let fixture: ComponentFixture<SearchCampaignsCardComponent>;
  const clientConfigServiceStub = { baseApiUrl: 'baseApiUrl' };
  const mockWindow: Window = jasmine.createSpyObj('Window', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchCampaignsCardComponent,
        OmniCardHeaderComponent,
        OnboardCampaignComponent,
        OnboardStatusComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ClientConfigService, useValue: clientConfigServiceStub },
        { provide: WindowRef, useValue: mockWindow },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCampaignsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
