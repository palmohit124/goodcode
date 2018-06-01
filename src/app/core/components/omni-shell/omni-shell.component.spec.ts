import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {ClientConfigService} from '../../services/client-config/client-config.service';
import {OmniShellComponent} from './omni-shell.component';
import {ClientState, reducers} from '../../reducers';
import {profileActions} from '../../actions';
import {UserProfile} from '../../../models/user-profile';
import {OmniTestingModule} from '../../../helpers/testing';

describe('OmniShellComponent', () => {
  let fixture: ComponentFixture<OmniShellComponent>;
  let component: OmniShellComponent;
  let debugElement: DebugElement;

  let store: Store<ClientState>;

  beforeEach(async(() => {

     const clientConfigServiceStub = {
       get() {
        const routes = {
          routes: {
            routesWithoutNav : []
          }
        };
        return routes;
      }
    };

    TestBed.configureTestingModule({
      imports: [
        OmniTestingModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        OmniShellComponent,
      ],
      providers: [
        {provide: ClientConfigService, useValue: clientConfigServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(OmniShellComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
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
