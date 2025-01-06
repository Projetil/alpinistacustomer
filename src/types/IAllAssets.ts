import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IAllAssets {
    id: number;
    severityType: SeverityTypeEnum;
    domainName: string;
    issuesOrRisks: number
  }

  export interface IPagedAllAssets {
    totalItems: number;
    items: IAllAssets[];
  }
  