import { customerActions } from '../actions';
import { reducer } from './customer.reducer';
import { Customer, CustomerList, EmptyCustomerList } from '../../models/customer';

const initialState = {
  loaded: false,
  loading: false,
  customers: EmptyCustomerList,
  selectedCustomer: null,
  customerCreated: false
};

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

describe('The customer reducer', () => {

  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load', () => {
    it('should return customer state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new customerActions.Load({}));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Success', () => {
    it('should return customer state as loaded with list of customers', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new customerActions.Load({})), new customerActions.LoadSuccess(mockCustomers));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.customers).toEqual(mockCustomers);
    });
  });

  describe('when the dispatched action is Load Fail', () => {
    it('should return customer state as loaded with empty list of customers', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new customerActions.Load({})), new customerActions.LoadFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.customers.customers).toEqual([]);
    });
  });

  describe('when the dispatched action is Select Success Customer', () => {
    it('should save selected customer in state', () => {
      const loadSuccessResult = reducer(reducer(reducer(undefined, { type: null }), new customerActions.Load({})), new customerActions.LoadSuccess(mockCustomers));
      const result = reducer(loadSuccessResult, new customerActions.SelectSuccess(loadSuccessResult.customers[0]));
      expect(result.selectedCustomer).toEqual(loadSuccessResult.customers[0]);
    });
  });

  describe('when the dispatched action is Edit Success Selected Customer', () => {
    it('should update the selected customer', () => {
      const loadSuccessResult = reducer(reducer(reducer(undefined, { type: null }), new customerActions.Load({})), new customerActions.LoadSuccess(mockCustomers));
      const selectResult = reducer(loadSuccessResult, new customerActions.Select(loadSuccessResult.customers.customers[0]));
      const result = reducer(selectResult, new customerActions.EditSuccess(mockCustomerData));
      expect(result.selectedCustomer.name).toEqual(mockCustomerData.name);
    });
  });
});
