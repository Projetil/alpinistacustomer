import { HttpStatusCode } from "axios";
import { api } from "./api";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import {
  ICreateEnvironment,
  IEnvironment,
  IPagedEnvironment,
  IUpdateEnvironment,
} from "@/types/IEnvironment";

const endpoint = "/Environments";

const EnvironmentService = {
  GetAll: async (
    pageNumber: number,
    pageSize: number,
    typeId?: number,
    companyId?: number
  ) => {
    try {
      const res = await api.get(
        `${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}${
          typeId ? `&typeId=${typeId}` : ""
        }${companyId ? `&companyId=${companyId}` : ""}`
      );
      return res.data as IPagedEnvironment;
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
      return res.data as IEnvironment;
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
  Post: async (company: ICreateEnvironment) => {
    try {
      const res = await api.post(`${endpoint}`, company);
      return res.data as IEnvironment;
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
  Put: async (company: Partial<IUpdateEnvironment>, id: number) => {
    try {
      const res = await api.put(`${endpoint}/${id}`, company);
      return res.data as IEnvironment;
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

export default EnvironmentService;
