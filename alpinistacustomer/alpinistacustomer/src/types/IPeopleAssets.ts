import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

export interface IPeopleAssets {
    id: number;
    hostName: string;
    email: string;
    severityType: SeverityTypeEnum;
  }

  export interface IPagedPeopleAssets {
    totalItems: number;
    items: IPeopleAssets[];
  }
  