export interface ICriticityHome {
  totalRisks: number;
  totalCritical: number;
  totalHigh: number;
  totalMedium: number;
  totalLow: number;
  totalInfo: number;
}

export interface IStatusHome {
  totalRisks: number;
  totalPending: number;
  totalReopened: number;
  totalFixed: number;
  totalAccepted: number;
  totalInRetest: number;
  totalInTreatment: number;
  totalNonExistent: number;
  totalNotExecuted: number;
}

export interface ITab4And5HomeTable {
  id: string;
  name: string;
  totalRisks: number;
}

export interface ITimeLineHome {
  day: number;
  created: number;
  fixed: number;
}

export interface IIrrHome {
  totalIRR: number;
  percentageIRR: number;
  irrChart: Array<{
    month: number;
    fixed: number;
    identified: number;
  }>;
}
