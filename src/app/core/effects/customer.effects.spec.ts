import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {Router, RouterModule} from '@angular/router';
import {CustomerEffects} from './customer.effects';
import {customerActions} from '../actions';
import {CustomerService} from '../services/customer/customer.service';
import {ToastService} from '../services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {Customer, CustomerList, EmptyCustomerList} from '../../models/customer';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../reducers';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;


const mockCustomers: CustomerList = {
  'customers': [{
    'id': '1',
    'name': 'Customer Name 1',
    'status': 'active',
    'subscriptions': [1, 5],
    'href': '/customers/1'
  }, {
    'id': '2',
    'name': 'Customer Name',
    'status': 'active',
    'subscriptions': [],
    'href': '/customers/1'
  }],
  'total_items': 10,
};

const mockCustomerData: Customer = {
  'id': '0',
  'name': 'Edited Customer',
  'status': 'active',
  'subscriptions': [],
  'href': '/customers/0'
};

describe('Customer Effects', () => {

  let effects: CustomerEffects;
  let actions: Observable<any>;
  let customerService: SpyObj<CustomerService>;

  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    customerService = jasmine.createSpyObj('CustomerSrvice', ['loadCustomers', 'createCustomer', 'editCustomer',
      'saveCustomerSession']);

    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers)
      ],
      providers: [
        CustomerEffects,
        provideMockActions(() => actions),
        { provide: CustomerService, useValue: customerService },
        { provide: Router, useValue: router },
        ToastService,
      ],
    });

    effects = TestBed.get(CustomerEffects);
  });

  describe('when a LOAD action is observed', () => {
    describe('and the customer service responds with the customer list', () => {
      it('should dispatch a load succeeded action with the customerlist', () => {
        const customers: CustomerList = mockCustomers;
        customerService.loadCustomers.and.returnValue(Observable.of(customers));
        actions = hot('a', { a: new customerActions.Load({}) });
        const expected = cold('a', { a: new customerActions.LoadSuccess(customers) });
        expect(effects.loadCustomers$).toBeObservable(expected);
      });
    });

    describe('when no customer state is currently stored', () => {
      it('should dispatch a load succeeded action with the empty customer list', () => {
        customerService.loadCustomers.and.returnValue(Observable.of(EmptyCustomerList));
        actions = hot('a', { a: new customerActions.Load({}) });
        const expected = cold('a', { a: new customerActions.LoadSuccess(EmptyCustomerList) });
        expect(effects.loadCustomers$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        customerService.loadCustomers.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new customerActions.Load({}) });
        const expected = cold('a', { a: new customerActions.LoadFail('An error') });
        expect(effects.loadCustomers$).toBeObservable(expected);
      });
    });
  });


  describe('when a ADD action is observed', () => {
    describe('and the customer service responds success', () => {
      it('should dispatch a add success action', () => {
        const customer: Customer = mockCustomers[0];
        customerService.createCustomer.and.returnValue(Observable.of(customer));
        actions = hot('a', { a: new customerActions.Add({}) });
        const expected = cold('a', { a: new customerActions.AddSuccess() });
        expect(effects.addCustomer$).toBeObservable(expected);
      });

      describe('and when a add success action is dispached', () => {
        it('should dispatch a action reset customer creation status', () => {
          actions = hot('a', { a: new customerActions.AddSuccess() });
          const expected = cold('a', { a: new customerActions.ResetCustomerCreationStatus() });
          expect(effects.addCustomerSuccess$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a add failed Action', () => {
        const customer: Customer = mockCustomers[0];
        customerService.createCustomer.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new customerActions.Add({}) });
        const expected = cold('a', { a: new customerActions.AddFail('An error') });
        expect(effects.addCustomer$).toBeObservable(expected);
      });
    });
  });

  describe('when a EDIT action is observed', () => {
    describe('and the customer service responds success', () => {
      it('should dispatch a edit success', () => {
        customerService.editCustomer.and.returnValue(Observable.of(mockCustomerData));
        actions = hot('a', { a: new customerActions.Edit('0', {}) });
        const expected = cold('a', { a: new customerActions.EditSuccess(mockCustomerData) });
        expect(effects.editCustomer$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a edit failed action', () => {
        customerService.editCustomer.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new customerActions.Edit('0', {}) });
        const expected = cold('a', { a: new customerActions.EditFail('An error') });
        expect(effects.editCustomer$).toBeObservable(expected);
      });
    });
  });

  describe('when a SELECT action is observed', () => {
    describe('and the customer service responds success', () => {
      it('should dispatch a select success', () => {
        customerService.saveCustomerSession.and.returnValue(Observable.of({}));
        actions = hot('a', { a: new customerActions.Select(mockCustomerData) });
        const expected = cold('a', { a: new customerActions.SelectSuccess(mockCustomerData) });
        expect(effects.selectCustomer$).toBeObservable(expected);
      });
    });
  });

  describe('when a load customer init action is observed', () => {
    describe('and the customer is not loaded in state', () => {
      it('should dispatch a load', () => {
        actions = hot('a', { a: new customerActions.LoadInit() });
        const expected = cold('a', {
          a: new customerActions.Load({
            offset: 0,
            limit: 10,
            status: 'active'
          })
        });
        expect(effects.loadCustomersInit$).toBeObservable(expected);
      });
    });
  });
});
