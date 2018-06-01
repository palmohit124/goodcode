import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {ClientConfigService} from '../../../core/services/client-config/client-config.service';
import {ClientState, reducers} from '../../../core/reducers';
import {profileActions} from '../../../core/actions';
import {TagShellComponent} from './tag-shell.component';
import {OmniTestingModule} from '../../../helpers/testing';
import {UserProfile} from '../../../models/user-profile';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TagShellComponent', () => {
  let component: TagShellComponent;
  let fixture: ComponentFixture<TagShellComponent>;
  let debugElement: DebugElement;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    const clientConfigServiceStub = {
      get() {
        const routes = {
          routes: {
            routesWithoutNav: []
          }
        };
        return routes;
      }
    };
    TestBed.configureTestingModule({
      imports: [
        OmniTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [TagShellComponent],
      providers: [
        { provide: ClientConfigService, useValue: clientConfigServiceStub }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    })
      .compileComponents();
  }));


  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TagShellComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create TagShellComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a profile load is successful', () => {
    it('should display the users profile', () => {
      const expectedProfile: UserProfile = {
        nickname: 'Mary',
        email: 'jane@marchex.com',
        user_id: '123123',
        picture: 'blah.jpg',
        name: 'Mary Jane',
      };
      store.dispatch(new profileActions.LoadUserProfileSucceeded(expectedProfile));

      component.user$.subscribe(p => expect(p).toEqual(expectedProfile));
    });
  });
});
