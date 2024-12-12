export interface ActiveTable {
  active: string;
  issuesRisks: number;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
}
export interface EnvironmentTable {
  environment: string;
  active: string;
  issuesRisks: number;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
}

export interface QuestionnaireTable {
  questionnaire?: string;
  respondent?: string;
  type: string;
  status: "Finalizado" | "Em andamento" | "Não conforme";
  createDate: string;
  limitDate: string;
}

export const questionnaireTableData: QuestionnaireTable[] = [
  {
    questionnaire: "Enterprise S.A",
    respondent: "Ativo",
    type: "Interno",
    status: "Finalizado",
    createDate: "01/01/2024",
    limitDate: "01/01/2024"
  },
  {
    questionnaire: "Enterprise S.A",
    respondent: "Ativo",
    type: "Interno",
    status: "Finalizado",
    createDate: "01/01/2024",
    limitDate: "01/01/2024"
  },
  {
    questionnaire: "Enterprise S.A",
    respondent: "Ativo",
    type: "Interno",
    status: "Finalizado",
    createDate: "01/01/2024",
    limitDate: "01/01/2024"
  },
  {
    questionnaire: "Enterprise S.A",
    respondent: "Ativo",
    type: "Interno",
    status: "Finalizado",
    createDate: "01/01/2024",
    limitDate: "01/01/2024"
  },
  {
    questionnaire: "Enterprise S.A",
    respondent: "Ativo",
    type: "Interno",
    status: "Finalizado",
    createDate: "01/01/2024",
    limitDate: "01/01/2024"
  },
  {
    questionnaire: "Enterprise S.A",
    respondent: "Ativo",
    type: "Interno",
    status: "Finalizado",
    createDate: "01/01/2024",
    limitDate: "01/01/2024"
  },
];

export const environmentTableData: EnvironmentTable[] = [
  {
    environment: "Ambiente",
    active: "Ativo",
    issuesRisks: 420,
    severity: "Crítico",
  },
  {
    environment: "Ambiente",
    active: "Ativo",
    issuesRisks: 420,
    severity: "Alto",
  },
  {
    environment: "Ambiente",
    active: "Ativo",
    issuesRisks: 420,
    severity: "Médio",
  },
  {
    environment: "Ambiente",
    active: "Ativo",
    issuesRisks: 420,
    severity: "Baixo",
  },
  {
    environment: "Ambiente",
    active: "Ativo",
    issuesRisks: 420,
    severity: "Info",
  },
  {
    environment: "Ambiente",
    active: "Ativo",
    issuesRisks: 420,
    severity: "Alto",
  },
  {
    environment: "Ambiente",
    active: "Ativo",
    issuesRisks: 420,
    severity: "Crítico",
  },
];

export const activeTableData: ActiveTable[] = [
  {
    active: "Ativo",
    issuesRisks: 420,
    severity: "Crítico",
  },
  {
    active: "Ativo",
    issuesRisks: 420,
    severity: "Alto",
  },
  {
    active: "Ativo",
    issuesRisks: 420,
    severity: "Médio",
  },
  {
    active: "Ativo",
    issuesRisks: 420,
    severity: "Baixo",
  },
  {
    active: "Ativo",
    issuesRisks: 420,
    severity: "Info",
  },
  {
    active: "Ativo",
    issuesRisks: 420,
    severity: "Alto",
  },
  {
    active: "Ativo",
    issuesRisks: 420,
    severity: "Crítico",
  },
];
