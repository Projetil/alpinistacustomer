import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IAllAssets {
  asset: {
    id: number;
    companyId: number;
    hostname: string;
    activetype: number;
    emailAddress: string;
    domainStatus: string | null;
    issuesOrRisks: number;
    severityType: SeverityTypeEnum;
    createdAt: string;
    updatedAt: string;
    expiryDate: string | null;
    isIgnored: boolean;
    createdBy: number;
    ip: string;
    modifiedBy: number;
    description: string;
    createdByName: string;
    modifiedByName: string;
    totalRisks: number;
  };
}

export interface IPagedAllAssets {
  totalItems: number;
  items: IAllAssets[];
}
