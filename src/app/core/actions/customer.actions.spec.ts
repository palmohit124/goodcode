import { customerActions } from './';
import { Customer, CustomerList } from '../../models/customer';

const mockCustomers: CustomerList = {
  customers: [
    {
      'id': '12',
      'name': 'jmoody QA',
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

describe('Customer Actions', () => {
  it('should define a load customer init action', () => {
    const action = new customerActions.LoadInit();
    expect(action.type).toBe(customerActions.LOADINIT);
  });

  it('should define a load customer action', () => {
    const action = new customerActions.Load({});
    expect(action.type).toBe(customerActions.LOAD);
  });

  it('should define a load success customer action', () => {
    const action = new customerActions.LoadSuccess(mockCustomers);
    expect(action.type).toBe(customerActions.LOAD_SUCCESS);
    expect(action.payload).toBe(mockCustomers);
  });

  it('should define a load fail customer action', () => {
    const action = new customerActions.LoadFail('Error');
    expect(action.type).toBe(customerActions.LOAD_FAIL);
  });

  it('should define a add customer action', () => {
    const action = new customerActions.Add('Add');
    expect(action.type).toBe(customerActions.ADD);
    expect(action.body).toBe('Add');
  });

  it('should define a add fail customer action', () => {
    const action = new customerActions.AddFail('Error');
    expect(action.type).toBe(customerActions.ADD_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a selected init action', () => {
    const action = new customerActions.SelectedInit();
    expect(action.type).toBe(customerActions.SELECTED_INIT);
  });

  it('should define a select customer action', () => {
    const action = new customerActions.Select(mockCustomers[0]);
    expect(action.type).toBe(customerActions.SELECT);
    expect(action.payload).toBe(mockCustomers[0]);
  });

  it('should define a select success customer action', () => {
    const action = new customerActions.SelectSuccess(mockCustomers.customers[0]);
    expect(action.type).toBe(customerActions.SELECT_SUCCESS);
    expect(action.payload).toBe(mockCustomers.customers[0]);
  });

  it('should define a edit fail customer action', () => {
    const action = new customerActions.SelectFail('Error');
    expect(action.type).toBe(customerActions.SELECT_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a edit customer action', () => {
    const updateCutomer = {
      name: 'Customer Name',
      subscriptions: []
    };
    const action = new customerActions.Edit('1', updateCutomer);
    expect(action.type).toBe(customerActions.EDIT);
    expect(action.body).toEqual(updateCutomer);
  });

  it('should define a edit success customer action', () => {
    const action = new customerActions.EditSuccess(mockCustomers.customers[0]);
    expect(action.type).toBe(customerActions.EDIT_SUCCESS);
    expect(action.payload).toEqual(mockCustomers.customers[0]);
  });

  it('should define a edit fail customer action', () => {
    const action = new customerActions.EditFail('Error');
    expect(action.type).toBe(customerActions.EDIT_FAIL);
    expect(action.payload).toBe('Error');
  });
});
