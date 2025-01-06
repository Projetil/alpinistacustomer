import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IAssets {
    id: number;
    severityType: SeverityTypeEnum;
    domainName: string;
    issuesOrRisks: number
  }

  export interface IPagedAssets {
    totalItems: number;
    items: IAssets[];
  }
  