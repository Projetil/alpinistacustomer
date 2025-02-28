import { api } from "./api";
import { HttpStatusCode } from "axios";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import {
  ICreateQuestionnary,
  IPagedQuestionnary,
  IPagedQuestionnaryHome,
  IQuestionnary,
} from "@/types/IQuestionnary";

const endpoint = "/Questionaries";

const QuestionnaryService = {
  GetAll: async (
    pageNumber: number,
    pageSize: number,
    customerId?: number,
    companyId?: number,
    orderByColumn?: string,
    orderByDirection?: string
  ) => {
    try {
      const res = await api.get(
        `${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}${
          companyId ? `&companyId=${companyId}` : ""
        }${customerId ? `&customerId=${customerId}` : ""}${
          orderByColumn ? `&orderByColumn=${orderByColumn}` : ""
        }${orderByDirection ? `&orderByDirection=${orderByDirection}` : ""}`
      );
      return res.data as IPagedQuestionnary;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  GetHomePage: async (
    pageNumber: number,
    pageSize: number,
    ascending: boolean,
    customerId?: number,
    companyId?: number,
    orderByColumn?: string
  ) => {
    try {
      const res = await api.get(
        `/Conformity/Table?pageNumber=${pageNumber}&pageSize=${pageSize}${
          companyId ? `&companyId=${companyId}` : ""
        }${customerId ? `&customerId=${customerId}` : ""}${
          orderByColumn ? `&orderByColumn=${orderByColumn}` : ""
        }&ascending=${ascending}`
      );
      return res.data as IPagedQuestionnaryHome;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  GetById: async (id: number) => {
    try {
      const res = await api.get(`${endpoint}/${id}`);
      return res.data as IQuestionnary;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  GetByIdWithAnswers: async (id: number) => {
    try {
      const res = await api.get(`${endpoint}/${id}/WithAnswers`);
      return res.data as IQuestionnary;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  Post: async (company: ICreateQuestionnary) => {
    try {
      const res = await api.post(`${endpoint}`, company);
      return res.data as IQuestionnary;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  Put: async (company: Partial<ICreateQuestionnary>, id: number) => {
    try {
      const res = await api.put(`${endpoint}/${id}`, company);
      return res.data as IQuestionnary;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  Delete: async (id: number) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
};

export default QuestionnaryService;
