export interface SearchAccount {
  source: string;
  sourceId: number;
  name: string;
  number?: string;
  integrationId: number;
  linked: boolean;
  href: string;
}

export interface SearchAccountList {
  accounts: SearchAccount[];
  total_items: number;
}

export const EmptySearchAccountList: SearchAccountList = {
  accounts: [],
  total_items: 0
};

