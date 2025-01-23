export interface IAssetsAdm {
  id: number;
  hostname: string;
  ip: string;
  activetype: number;
  modifiedBy: number;
  isIgnored: boolean;
  companyId?: number;
  description?: string;
  severityType?: number;
  emailAddress?: string;
  ports: IAssetsAdmPorts[];
}

export interface IUpdateAssetsAdm {
  id: number;
  hostname: string;
  activetype: number;
  modifiedBy: number;
  isIgnored: boolean;
  description?: string;
  severityType?: number;
  emailAddress?: string;
  assetIpPorts: IUpdateAssetsPortsAdm[];
}

export interface IUpdateAssetsPortsAdm {
  id: number;
  port: string;
}

export interface IAssetsAdmPorts {
  id: number;
  assetId?: number;
  port: string;
}

export const severityType = ["Info", "Baixo", "Médio", "Alto", "Crítico"];
export const activeTypes = ["Infra / Web", "Mobile", "Domínio", "Pessoa"];
