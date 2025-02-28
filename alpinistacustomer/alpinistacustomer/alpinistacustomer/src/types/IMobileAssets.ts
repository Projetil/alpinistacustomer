import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IMobileAssets {
  id: number;
  hostName: string;
  severityType: SeverityTypeEnum;
}

export interface ICompanyMobileAppAssets {
  id: number;
  companyId: number;
  storeAppUrl: string;
  appName: string;
  store: number;
}

export interface IPagedMobileAssets {
  totalItems: number;
  items: ICompanyMobileAppAssets[];
}

export interface ICompanyRequestMobileDto {
  companyId: number;
  pageNumber: number;
  pageSize: number;
  appName?: string;
  sortColumn?: string;
  sortDirection?: string;
}
