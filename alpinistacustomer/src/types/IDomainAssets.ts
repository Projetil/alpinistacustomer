import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IDomainAssets {
    id: number;
    hostName: string;
    status: boolean;
    severityType: SeverityTypeEnum;
  }

  export interface IPagedDomainAssets {
    totalItems: number;
    items: IDomainAssets[];
  }
  