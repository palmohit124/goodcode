import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {AuthService} from '../services/auth/auth.service';
import {Store} from '@ngrx/store';
import {AuthInit} from '../actions/auth.actions';
import {Logout} from '../actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private store: Store<any>, private router: Router) {
    store.dispatch(new AuthInit());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthorised()
      .switchMap(authorised => {
        if (!authorised) {
          this.router.navigate(['unauthorized']);
          return Observable.of(false);
        }
        return Observable.of(true);
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
