export interface ActiveTable {
  active: string;
  issuesRisks: number;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
}

export interface DomainTable {
  active: string;
  status: string;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
}

export interface CloudTable {
  active: string;
  url: string;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
}

export interface PeopleTable {
  active: string;
  email: string;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
}

export interface MobileTable {
  active: string;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
}

export interface EnvTable {
  active: string;
  issues: string;
  severity: "Info" | "Baixo" | "Médio" | "Alto" | "Crítico";
  ip: string;
  port: number;
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

export const mobileTableData: MobileTable[] = [
  {
    active: "Ativo",
    severity: "Crítico",
  },
  {
    active: "Ativo",
    severity: "Alto",
  },
  {
    active: "Ativo",
    severity: "Médio",
  },
  {
    active: "Ativo",
    severity: "Baixo",
  },
  {
    active: "Ativo",
    severity: "Info",
  },
  {
    active: "Ativo",
    severity: "Alto",
  },
  {
    active: "Ativo",
    severity: "Crítico",
  },
];

export const domainTableData: DomainTable[] = [
  {
    active: "Ativo",
    status: "Ativo",
    severity: "Crítico",
  },
  {
    active: "Ativo",
    status: "Inativo",
    severity: "Alto",
  },
  {
    active: "Ativo",
    status: "Inativo",
    severity: "Médio",
  },
  {
    active: "Ativo",
    status: "Inativo",
    severity: "Baixo",
  },
  {
    active: "Ativo",
    status: "Inativo",
    severity: "Info",
  },
  {
    active: "Ativo",
    status: "Inativo",
    severity: "Alto",
  },
  {
    active: "Ativo",
    status: "Inativo",
    severity: "Crítico",
  },
];

export const cloudTableData: CloudTable[] = [
  {
    active: "Ativo",
    url: "http://www.example.com/index.html",
    severity: "Crítico",
  },
  {
    active: "Ativo",
    url: "http://www.example.com/index.html",
    severity: "Alto",
  },
  {
    active: "Ativo",
    url: "http://www.example.com/index.html",
    severity: "Médio",
  },
  {
    active: "Ativo",
    url: "http://www.example.com/index.html",
    severity: "Baixo",
  },
  {
    active: "Ativo",
    url: "http://www.example.com/index.html",
    severity: "Info",
  },
  {
    active: "Ativo",
    url: "http://www.example.com/index.html",
    severity: "Alto",
  },
  {
    active: "Ativo",
    url: "http://www.example.com/index.html",
    severity: "Crítico",
  },
];

export const peopleTableData: PeopleTable[] = [
  {
    active: "Ativo",
    email: "someone@example.com",
    severity: "Crítico",
  },
  {
    active: "Ativo",
    email: "someone@example.com",
    severity: "Alto",
  },
  {
    active: "Ativo",
    email: "someone@example.com",
    severity: "Médio",
  },
  {
    active: "Ativo",
    email: "someone@example.com",
    severity: "Baixo",
  },
  {
    active: "Ativo",
    email: "someone@example.com",
    severity: "Info",
  },
  {
    active: "Ativo",
    email: "someone@example.com",
    severity: "Alto",
  },
  {
    active: "Ativo",
    email: "someone@example.com",
    severity: "Crítico",
  },
];

export const envTableData: EnvTable[] = [
  {
    active: "Ativo",
    issues: "420",
    severity: "Crítico",
    ip:"291.789.634",
    port: 6300
  },
  {
    active: "Ativo",
    issues: "420",
    severity: "Alto",
    ip:"291.789.634",
    port: 6300
  },
  {
    active: "Ativo",
    issues: "420",
    severity: "Médio",
    ip:"291.789.634",
    port: 6300
  },
  {
    active: "Ativo",
    issues: "420",
    severity: "Baixo",
    ip:"291.789.634",
    port: 6300
  },
  {
    active: "Ativo",
    issues: "420",
    severity: "Info",
    ip:"291.789.634",
    port: 6300
  },
  {
    active: "Ativo",
    issues: "420",
    severity: "Alto",
    ip:"291.789.634",
    port: 6300
  },
  {
    active: "Ativo",
    issues: "420",
    severity: "Crítico",
    ip:"291.789.634",
    port: 6300
  },
];