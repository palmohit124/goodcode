import { customerActions } from '../actions';
import { Customer, CustomerList, EmptyCustomerList } from '../../models/customer';


export interface CustomerState {
  loaded: boolean;
  loading: boolean;
  customers: CustomerList;
  selectedCustomer: Customer;
  customerCreated: boolean;
}

const initialState: CustomerState = {
  loaded: false,
  loading: false,
  customers: EmptyCustomerList,
  selectedCustomer: null,
  customerCreated: false
};

export function reducer(state = initialState, action: customerActions.Actions): CustomerState {
  switch (action.type) {
    case customerActions.LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case customerActions.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        customers: action.payload
      };
    }

    case customerActions.LOAD_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        customers: EmptyCustomerList
      };
    }

    case customerActions.SELECT_SUCCESS: {
      return {
        ...state,
        selectedCustomer: action.payload
      };
    }

    case customerActions.EDIT_SUCCESS: {
      return {
        ...state,
        selectedCustomer: action.payload
      };
    }

    case customerActions.ADD_SUCCESS: {
      return {
        ...state,
        customerCreated: true
      };
    }

    case customerActions.RESET_CUSTOMER_CREATION_STATUS: {
      return {
        ...state,
        customerCreated: false
      };
    }

    default:
      return state;
  }
}
