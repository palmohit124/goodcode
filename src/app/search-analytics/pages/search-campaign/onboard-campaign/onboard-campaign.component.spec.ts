import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule, combineReducers, Store} from '@ngrx/store';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';

import { WindowRef } from '../../../../core/providers/window-ref.provider';
import { OnboardCampaignComponent } from './onboard-campaign.component';
import {AuthState} from '../../../../models/user-tokens';
import {AuthStateLoadSucceeded} from '../../../../core/actions/auth.actions';

describe('OnboardCampaignComponent', () => {
  let component: OnboardCampaignComponent;
  let fixture: ComponentFixture<OnboardCampaignComponent>;
  let store: Store<any>;
  const mockWindow: Window = jasmine.createSpyObj('Window', ['open']);
  let mockConfig;

  beforeEach(async(() => {
    mockConfig = jasmine.createSpyObj('ClientConfigService', ['get']);

    TestBed.configureTestingModule({
      declarations: [OnboardCampaignComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        })
      ],
      providers: [
        { provide: ClientConfigService, useValue: mockConfig },
        { provide: WindowRef, useValue: mockWindow }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
  });

  it('should create OnboardCampaignComponent', () => {
    expect(component).toBeTruthy();
  });
});
