import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {Store, StoreModule} from '@ngrx/store';
import {ClientState, reducers} from '../../../reducers';
import {LoadUserProfileSucceeded} from '../../../actions/user-profile.actions';
import {UserProfile} from '../../../../models/user-profile';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [ProfileComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
      store.dispatch(new LoadUserProfileSucceeded(expectedProfile));

      component.user$.subscribe(p => expect(p).toEqual(expectedProfile));
    });
  });
});
