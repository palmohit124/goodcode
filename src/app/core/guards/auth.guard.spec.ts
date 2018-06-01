import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {cold} from 'jasmine-marbles';
import {OmniTestingModule} from '../../helpers/testing';
import {AuthService} from '../services/auth/auth.service';
import {AuthGuard} from './auth.guard';
import SpyObj = jasmine.SpyObj;
import {Store} from '@ngrx/store';
import {AUTH_INIT} from '../actions/auth.actions';
import { Router } from '@angular/router';


describe('Auth Guard', () => {

  let guard: AuthGuard;
  let authService: SpyObj<AuthService>;
  let store: SpyObj<Store<any>>;
  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthorised', 'login']);
    store = jasmine.createSpyObj(['dispatch']);

    TestBed.configureTestingModule({
      imports: [OmniTestingModule],
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authService},
        {provide: Store, useValue: store},
        {provide: Router, useValue: router}
      ],
    });
    guard = TestBed.get(AuthGuard);
  });

  describe('when constructed', () => {
    it('should dispatch auth init action', () => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch.calls.mostRecent().args[0].type).toEqual(AUTH_INIT);
    });
  });
  describe('when a user is authenticated', () => {
    describe('and is attempting to access a route', () => {
      it('should return true', () => {
        authService.isAuthorised.and.returnValue(Observable.of(true));

        expect(guard.canActivate(null, null)).toBeObservable(cold('(a|)', {a: true}));
      });
    });
    describe('and is attempting to access a child route', () => {
      it('should return true', () => {
        authService.isAuthorised.and.returnValue(Observable.of(true));

        expect(guard.canActivateChild(null, null)).toBeObservable(cold('(a|)', {a: true}));
      });
    });
  });
  describe('when a user is not authenticated', () => {
    describe('and is attempting to access a route', () => {
      it('should login via the authService and return false', () => {
        authService.isAuthorised.and.returnValue(Observable.of(false));
        expect(guard.canActivate(null, null)).toBeObservable(cold('(a|)', {a: false}));
      });
    });
    describe('and is attempting to access a child route', () => {
      it('should login via the authService and return false', () => {
        authService.isAuthorised.and.returnValue(Observable.of(false));
        expect(guard.canActivate(null, null)).toBeObservable(cold('(a|)', {a: false}));
      });
    });
  });
});
