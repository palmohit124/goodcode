export interface Customer {
  id: string;
  name: string;
  status: string;
  subscriptions: number[];
  href: string;
}

export interface CustomerList {
  customers: Customer[];
  total_items: number;
}

export const EmptyCustomerList: CustomerList = {
  customers: [],
  total_items: 0
};
