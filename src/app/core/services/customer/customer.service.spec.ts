import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../logger/no-op-logger';
import { CustomerService } from './customer.service';
import { Customer, CustomerList } from '../../../models/customer';
import { environment } from '../../../../environments/environment';
import { ClientConfigService } from '../client-config/client-config.service';
import { LocalStorage } from '../local-storage/local-storage';
import { ClientState, reducers } from '../../reducers';

const mockCustomers: CustomerList = {
  customers: [
    {
      'id': '12',
      'name': 'Customer Name',
      'status': 'inactive',
      'subscriptions': [1, 5],
      'href': '/customers/12',
    },
    {
      'id': '1',
      'name': 'test customer',
      'status': 'active',
      'subscriptions': [1, 1],
      'href': '/customers/1',
    },
    {
      'id': '11',
      'name': 'AAA Good For Demos',
      'status': 'active',
      'subscriptions': [1],
      'href': '/customers/11',
    }
  ],
  total_items: 3
};

describe('CustomerService', () => {
  let service: CustomerService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  let localStorageSpy: jasmine.SpyObj<LocalStorage>;
  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    localStorageSpy = jasmine.createSpyObj(['getItem', 'setItem']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [CustomerService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);
    service = new CustomerService(http, logger, configServiceSpy, localStorageSpy);
  }));

  describe('when loading customers', () => {
    describe('when successful', () => {
      it('should return customer list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const cutomerList: CustomerList = mockCustomers;
          service.loadCustomers({}).subscribe(
            response => {
              expect(response).toEqual(cutomerList);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers');
          expect(mock.request.method).toEqual('GET');
          mock.flush(cutomerList);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadCustomers({}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when creating customer', () => {
    describe('when successful', () => {
      it('should return customer',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const cutomer: Customer = mockCustomers.customers[0];
          const newCutomer = {
            name: 'Customer Name',
            subscriptions: []
          };
          service.createCustomer(newCutomer).subscribe(
            response => {
              expect(response).toEqual(cutomer);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers');
          expect(mock.request.body).toEqual(newCutomer);
          expect(mock.request.method).toEqual('POST');
          mock.flush(cutomer);
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const newCutomer = {
            name: 'Customer Name',
            subscriptions: []
          };
          service.createCustomer(newCutomer).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers');
          expect(mock.request.body).toEqual(newCutomer);
          expect(mock.request.method).toEqual('POST');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        })));
    });
  });

  describe('when editing customer', () => {
    describe('when successful', () => {
      it('should return customer data',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const cutomer: Customer = mockCustomers.customers[0];
          const updateCutomer = {
            name: 'Customer Name',
            subscriptions: []
          };
          service.editCustomer('1', updateCutomer).subscribe(
            response => {
              expect(response).toEqual(cutomer);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/1');
          expect(mock.request.body).toEqual(updateCutomer);
          expect(mock.request.method).toEqual('PUT');
          mock.flush(cutomer);
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const updateCutomer = {
            name: 'Customer Name',
            subscriptions: []
          };
          service.editCustomer('1', updateCutomer).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/1');
          expect(mock.request.body).toEqual(updateCutomer);
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        })));
    });
  });

  describe('when loading customer', () => {
    describe('when successful', () => {
      it('should return customer',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const cutomer: Customer = mockCustomers.customers[0];
          service.loadCustomer('1').subscribe(
            response => {
              expect(response).toEqual(cutomer);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/1');
          expect(mock.request.method).toEqual('GET');
          mock.flush(cutomer);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadCustomer('1').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/1');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });
});
