import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import {TagToolbarComponent} from './tag-toolbar.component';
import {TagSidebarComponent} from '..';
import * as fromRoot from '../../../core/reducers';
import {reducers, TagManagementState} from '../../reducers';
import {rulesetActions} from '../../actions';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TagToolbarComponent', () => {
  let component: TagToolbarComponent;
  let fixture: ComponentFixture<TagToolbarComponent>;
  let store: Store<TagManagementState>;
  const AccountId = '34H4726U3';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        MatListModule,
        NoopAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tagManagement': combineReducers(reducers)
        }),
      ],
      declarations: [
        TagToolbarComponent,
        TagSidebarComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(TagToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TagToolbarComponent', () => {
    expect(component).toBeTruthy();
  });


  describe('when a tag-management route is active', () => {
    beforeEach(() => { store.dispatch(new rulesetActions.AddAccount(AccountId)); });
    it('should render img marchex logo', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const imgElement = compiled.querySelector('img');
      expect(imgElement['src'].includes('assets/logo/marchex-wordmark-white-small.png')).toBe(true);
    });
  });
});
