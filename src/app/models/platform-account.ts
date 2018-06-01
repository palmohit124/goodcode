export interface PlatformAccount {
  platformId: string;
  name: string;
  parentId: string;
  href: string;
}

export interface LinkedPlatformAccounts {
  parent: PlatformAccount;
  children: PlatformAccount[];
  total_items: number;
}

export interface UnlinkedParentAccounts {
  parents: PlatformAccount[];
  total_items: number;
}

export interface UnlinkedChildAccounts {
  children: PlatformAccount[];
  total_items: number;
}

export const EmptyPlatformAccount: PlatformAccount = {
  platformId: '',
  name: '',
  parentId: '',
  href: ''
};

export const EmptyLinkedPlatformAccounts: LinkedPlatformAccounts = {
  parent: null,
  children: [],
  total_items: 0
};


export const EmptyUnlinkedParentAccounts: UnlinkedParentAccounts = {
  parents: [],
  total_items: 0
};

export const EmptyUnlinkedChildAccounts: UnlinkedChildAccounts = {
  children: [],
  total_items: 0
};
