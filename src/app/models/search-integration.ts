export interface SearchIntegration {
  id: string;
  source: number | string;
  name: string;
  href: string;
}

export interface SearchIntegrationList {
  integrations: SearchIntegration[];
  total_items: number;
}

export const EmptySearchIntegrationList: SearchIntegrationList = {
  integrations: [],
  total_items: 0
};

export const EmptySearchIntegration: SearchIntegration = {
  id: '0',
  source: '',
  name: '',
  href: ''
};
