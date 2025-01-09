export interface IWebAssets {
    id: number;
    port: number;
    hostName: string;
    issuesOrRisks: number
  }

  export interface IPagedWebAssets {
    totalItems: number;
    items: IWebAssets[];
  }
  