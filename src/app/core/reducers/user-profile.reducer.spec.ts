import {profileActions} from '../actions';
import {UserProfile} from '../../models/user-profile';
import {reducer} from './user-profile.reducer';
import {EmptyUserProfile} from '../../models/empty-user-profile';

describe('The user profile reducer', () => {

  const exampleProfile = {
    name: 'Joesph Banana',
    email: 'jb@marchex.com',
    nickname: 'Joe Banana',
    user_id: '123',
    picture: 'url'
  };

  describe('when the user profile is successfully retrieved', () => {
    describe('when the previous state is defined', () => {
      it('should return the new user state', () => {
        const previousState = exampleProfile;
        const newProfile: UserProfile = {
          name: 'Marie Antoinette',
          email: 'ma@marchex.com',
          nickname: 'Maria',
          user_id: '897',
          picture: 'url'
        };
        const action = new profileActions.LoadUserProfileSucceeded(newProfile);

        const result = reducer(previousState, action);
        expect(result).toBeDefined('The profile property was not created / defined.');
        expect(result).toEqual(newProfile);
      });
    });
    describe('when the previous state is not defined', () => {
      it('should return the new user state', () => {
        const expectedProfile: UserProfile = exampleProfile;
        const action = new profileActions.LoadUserProfileSucceeded(expectedProfile);

        const result = reducer(EmptyUserProfile, action);
        expect(result).toBeDefined('The profile property was not created / defined.');
        expect(result).toEqual(expectedProfile);
      });
    });
  });

  describe('when the user profile is not successfully retrieved', () => {
    describe('when the previous state is defined', () => {
      it('should return the initial profile state', () => {
        const action = new profileActions.LoadUserProfileFailed('an error');
        const result = reducer(exampleProfile, action);
        expect(result).toBe(EmptyUserProfile);
      });
    });
    describe('when the previous state is not defined', () => {
      it('should return the initial profile state', () => {
        const action = new profileActions.LoadUserProfileFailed('an error');
        const result = reducer(EmptyUserProfile, action);
        expect(result).toBe(EmptyUserProfile);
      });
    });
  });
});
