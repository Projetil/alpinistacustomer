export interface IInfraAssets {
    id: number;
    ip: string;
    hostName: string;
    issuesOrRisks: number
  }

  export interface IPagedInfraAssets {
    totalItems: number;
    items: IInfraAssets[];
  }
  