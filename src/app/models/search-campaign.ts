export interface SearchCampaign {
  id: string;
  status: string;
  submittedFileName: string;
  submittedFileUrl: string;
  submitTime: string;
  submittedBy: string;
  completedTime: string;
  totalRowCount: number;
  successRowCount: number;
  errorFileUrl: string;
}
