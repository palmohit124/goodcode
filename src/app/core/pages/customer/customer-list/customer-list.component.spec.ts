import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule, MatDialogModule, MatMenuModule, MatPaginatorModule} from '@angular/material';
import {CustomerListComponent} from './customer-list.component';
import {ClientState, reducers} from '../../../reducers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomerList} from '../../../../models/customer';
import {LoadSuccess} from '../../../actions/customer.actions';

const mockCustomers: CustomerList = {
  customers: [
    {
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
    },
    {
      'id': '1',
      'name': 'test customer 1',
      'status': 'inactive',
      'subscriptions': [2],
      'href': '/customers/1',
    },
    {
      'id': '11',
      'name': 'test customer',
      'status': 'active',
      'subscriptions': [1],
      'href': '/customers/11',
    }
  ],
  total_items: 4
};

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatDialogModule,
        MatPaginatorModule,
        MatCardModule,
        StoreModule.forRoot(reducers),
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when customers get successful', () => {
    beforeEach(() => { store.dispatch(new LoadSuccess(mockCustomers)); });

    it('should display the customers', () => {
      expect(component.customerState.customers).toEqual(mockCustomers);
      expect(component.customerState.customers.customers.length).toEqual(mockCustomers.customers.length);
    });

    it('should display the ascending customers with orderBy', () => {
      expect(component.customerState.customers.customers[0].name).toEqual('jmoody QA');
    });

    it('should display the customers with orderBy ascending', () => {
      component.orderBy(true);
      expect(component.customerState.customers.customers[0].name).toEqual('jmoody QA');
    });

    it('should display the customers with orderBy descending', () => {
      component.orderBy(false);
      expect(component.customerState.customers.customers[0].name).toEqual('test QA');
    });
  });

});
