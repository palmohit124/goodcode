import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { MatDialogModule, MatTabsModule, MatPaginatorModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';

import { AccountsCardComponent } from './accounts-card.component';
import { SearchAccountsCardContentComponent, PlatformAccountsCardContentComponent } from '../..';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { OmniSearchComponent } from '../../../../shared/components';

describe('AccountsCardComponent', () => {
  let component: AccountsCardComponent;
  let fixture: ComponentFixture<AccountsCardComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AccountsCardComponent,
        SearchAccountsCardContentComponent,
        OmniCardHeaderComponent,
        OmniSearchComponent,
        PlatformAccountsCardContentComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatCardModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AccountsCardComponent', () => {
    expect(component).toBeTruthy();
  });
});
