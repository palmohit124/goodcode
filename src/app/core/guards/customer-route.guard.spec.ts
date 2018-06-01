import { TestBed, async, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { customerActions } from '../actions';
import { CustomerRouteGuard } from './customer-route.guard';
import { OmniTestingModule } from '../../helpers/testing';
import { EmptyCustomerList } from '../../models/customer';
import SpyObj = jasmine.SpyObj;

describe('CustomerRouteGuard', () => {
  let guard: CustomerRouteGuard;
  let store: SpyObj<Store<any>>;
  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    store = jasmine.createSpyObj(['dispatch', 'select']);
    TestBed.configureTestingModule({
      imports: [OmniTestingModule],
      providers: [
        CustomerRouteGuard,
        { provide: Store, useValue: store },
        { provide: Router, useValue: router }
      ],
    });
    guard = TestBed.get(CustomerRouteGuard);
  });

  describe('when customers are loadded', () => {
    describe('and list is empty', () => {
      it('should return true', () => {
        store.select.and.returnValue(Observable.of({
          loaded: true,
          loading: false,
          customers: EmptyCustomerList,
          selectedCustomer: null,
          customerCreated: false
        }));
        expect(guard.canActivate()).toBeObservable(cold('(a|)', { a: true }));
      });
    });

    describe('and there are more then 1 customer', () => {
      it('should return true', () => {
        store.select.and.returnValue(Observable.of({
          loaded: true,
          loading: false,
          customers: {
            customers: [{
              'id': '13',
              'name': 'test QA',
              'status': 'inactive',
              'subscriptions': [1, 4],
              'href': '/customers/12',
            },
            {
              'id': '12',
              'name': 'jmoody QA',
              'status': 'active',
              'subscriptions': [1, 4],
              'href': '/customers/12',
            }],
            total_items: 2
          },
          selectedCustomer: null,
          customerCreated: false
        }));
        expect(guard.canActivate()).toBeObservable(cold('(a|)', { a: true }));
      });
    });


    describe('and there is only one customer', () => {
      it('should return false and should select customer and should navigate to other route', () => {
        store.select.and.returnValue(Observable.of({
          loaded: true,
          loading: false,
          customers: {
            customers: [{
              'id': '13',
              'name': 'test QA',
              'status': 'inactive',
              'subscriptions': [1, 4],
              'href': '/customers/12',
            }],
            total_items: 1
          },
          selectedCustomer: null,
          customerCreated: false
        }));
        expect(guard.canActivate()).toBeObservable(cold('(a|)', { a: false }));
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch.calls.mostRecent().args[0].type).toEqual(customerActions.SELECT);
        expect(router.navigate).toHaveBeenCalled();
      });
    });
  });


});
