export interface IExternalEnvironment {
  id: number;
  environmentId: number;
  domain: string;
  tecnicalName: string;
  tecnicalPhone: number;
  tecnicalEmail: string;
  tecnicalPosition: string;
  comercialName: string;
  comercialPhone: number;
  comercialEmail: string;
  comercialPosition: string;
  financialRespName: string;
  financialRespPhone: number;
  financialRespEmail: string;
  financialRespPosition: string;
}

export interface IEnvironment {
  id: number;
  name: string;
  companyId: number;
  type: number;
  severity: number;
  status: number;
  externalEnvironment?: IExternalEnvironment;
}

export interface IPagedEnvironment {
  totalItems: number;
  items: IEnvironment[];
}

export interface ICreateEnvironment {
  name: string;
  type: number;
  companyId: number;
  ativos: string[];
  severity: number;
  status: number;
  externalEnvironment?: {
    domain: string;
    tecnicalName: string;
    tecnicalPhone: number;
    tecnicalEmail: string;
    tecnicalPosition: string;
    comercialName: string;
    comercialPhone: number;
    comercialEmail: string;
    comercialPosition: string;
    financialRespName: string;
    financialRespPhone: number;
    financialRespEmail: string;
    financialRespPosition: string;
  };
}

export interface ICreateExternalEnv {
  domain: string;
  tecnicalName: string;
  tecnicalPhone: number;
  tecnicalEmail: string;
  tecnicalPosition: string;
  comercialName: string;
  comercialPhone: number;
  comercialEmail: string;
  comercialPosition: string;
  financialRespName: string;
  financialRespPhone: number;
  financialRespEmail: string;
  financialRespPosition: string;
}

export interface IUpdateEnvironment {
  name: string;
  type: number;
  severity: number;
  companyId: number;
  status: number;
  externalEnvironment?: {
    id: number;
    environmentId: number;
    domain: string;
    tecnicalName: string;
    tecnicalPhone: number;
    tecnicalEmail: string;
    tecnicalPosition: string;
    comercialName: string;
    comercialPhone: number;
    comercialEmail: string;
    comercialPosition: string;
    financialRespName: string;
    financialRespPhone: number;
    financialRespEmail: string;
    financialRespPosition: string;
  };
}
