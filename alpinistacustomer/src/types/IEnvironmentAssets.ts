import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IEnvironmentAssets {
    id: number;
    hostName: string;
    port: number;
    ip: string;
    severityType: SeverityTypeEnum;
    issuesOrRisks: number
  }

  export interface IPagedEnvironmentAssets {
    totalItems: number;
    items: IEnvironmentAssets[];
  }
  

  