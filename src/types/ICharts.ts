export interface IHeader {
  statusCount: StatusCount;
  severityCount: SeverityCount;
}

export interface ICriticity {
  origin: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

export interface ICount {
  value: number;
  month: string;
}

interface StatusCount {
  pending: number;
  leaks: number;
  accepted: number;
  fixed: number;
  retest: number;
  reopened: number;
}

interface SeverityCount {
  critical: number;
  info: number;
  high: number;
  medium: number;
  low: number;
}

export interface IService {
  value: number;
  origin: number;
}

export interface ITimeCorrection {
  severity: number;
  daysToFix: number;
}

export interface IPizzaChartIRR {
  fixed: number;
  identified: number;
  month: number;
}

export interface IIdentifiedAndFixedIRR {
  fixed: number;
  identified: number;
  month: number;
}

export interface ITableSeverity {
  severity: number;
  riskName: string;
  quantity: number;
}

export interface AttackSurfaceAssetsResponse {
  ipAddress: number;
  subdomain: number;
  webApplication: number;
  emailAccount: number;
}

export interface IAttackSurfaceRisks {
  webApplication: number;
  brand: number;
  network: number;
  dataLeak: number;
}

export interface ITotalDangers {
  totalIssues: number;
  totalCritical: number;
  totalHigh: number;
  totalMedium: number;
  totalLow: number;
}

export interface IRiskCards {
  credentials: number;
  dataLeak: number;
  mobile: number;
  similarDomain: number;
  socialMedia: number;
}

export interface IIntelligenceTimeLine {
    quantity: number,
    time: number
}

export interface GetThirthDataRequest {
    pageNumber: number,
    pageSize: number,
    companyId?: number
}

export interface GetThirthDataResponse {
    totalItems: number,
    items: ThirthTableItems[]
}

export interface ThirthTableItems {
    name: string;
  totalRisks: number;
  totalInfos: number;
  totalLow: number;
  totalMedium: number;
  totalHigh: number;
  totalCritical: number;
}