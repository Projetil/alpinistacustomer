import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IMobileAssets {
    id: number;
    hostName: string;
    severityType: SeverityTypeEnum;
  }

  export interface IPagedMobileAssets {
    totalItems: number;
    items: IMobileAssets[];
  }
  