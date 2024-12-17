export interface IQuestionnary {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  customerId: number;
  questions: IQuestion[];
  type: number;
  limitDate: string;
}

export interface IPagedQuestionnary {
  totalItems: number;
  items: IQuestionnary[];
}

export interface IQuestion {
  id: number;
  questionaryId: number;
  title: string;
  selectBoxOption1?: string;
  selectBoxOption2?: string;
  selectBoxOption3?: string;
  answerType: number;
  answer: IAnswer[];
}

export interface IAnswer {
  id: number;
  questionId: number;
  customerId: number;
  value: string;
}

export interface ICreateQuestionnary {
  title: string;
  customerId: number;
  companyId: number;
  questions: ICreateQuestion[];
  type: number;
  limitDate: string;
}

export interface ICreateQuestion {
  title: string;
  answerType: number;
  maxFiles?: string;
  maxSize?: string;
  options?: string[];
}

export interface IQuestionDtoForm {
  id: number;
  title: string;
  type: string;
  fileSize?: number;
  maxFiles?: number;
  options?: string[];
}
