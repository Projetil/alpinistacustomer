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
    modifiedBy: number;
    description: string;
    createdByName: string;
    modifiedByName: string;
    totalRisks: number;
  };
  iPs: [
    {
      id: number;
      assetId: number;
      ip: string;
      createdAt: string;
      updatedAt: string | null;
      ports: {
        id: number;
        assetIpId: number;
        port: string;
        activetype: number;
        createdAt: string;
        updatedAt: string | null;
      }[];
    }
  ];
}

export interface IPagedAllAssets {
  totalItems: number;
  items: IAllAssets[];
}
