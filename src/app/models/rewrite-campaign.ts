export interface RewriteCampaign {
  campaignId: string;
  campaignName: string;
  accountId: string;
  status: string;
  description: string;
  kwlt: boolean;
  ctn: Ctn[];
}

export interface Ctn {
  cc: string;
  e164: string;
}

export interface RewriteCampaignList {
  campaigns: RewriteCampaign[];
}

export const EmptyRewriteCampaignList: RewriteCampaignList = {
  campaigns: []
};
