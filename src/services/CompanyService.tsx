import { ICompany, ICreateCompany, IPagedCompany } from "@/types/ICompany";
import { api } from "./api";
import { HttpStatusCode } from "axios";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import {
  ICompanyRequestMobileDto,
  IPagedMobileAssets,
} from "@/types/IMobileAssets";

const endpoint = "/Companies";

const CompanyService = {
  GetAll: async (
    pageNumber: number,
    pageSize: number,
    orderByColumn?: string,
    orderByDirection?: string
  ) => {
    try {
      const res = await api.get(
        `${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}${
          orderByColumn ? `&orderByColumn=${orderByColumn}` : ""
        }${orderByDirection ? `&orderByDirection=${orderByDirection}` : ""}`
      );
      return res.data as IPagedCompany;
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
      return res.data as ICompany;
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
  Post: async (company: ICreateCompany) => {
    try {
      const res = await api.post(`${endpoint}`, company);
      return res.data as ICompany;
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
  Put: async (company: ICreateCompany, id: number) => {
    try {
      const res = await api.put(`${endpoint}/${id}`, company);
      return res.data as ICompany;
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
  GetMobileCompany: async (request: ICompanyRequestMobileDto) => {
    try {
      const params = new URLSearchParams();
      if (request.pageNumber)
        params.append("pageNumber", String(request.pageNumber));
      if (request.pageSize) params.append("pageSize", String(request.pageSize));
      if (request.companyId)
        params.append("companyId", String(request.companyId));
      if (request.appName) params.append("appName", String(request.appName));
      if (request.sortColumn)
        params.append("sortColumn", String(request.sortColumn));
      if (request.sortDirection)
        params.append("sortDirection", String(request.sortDirection));

      const res = await api.get(
        `CompanyMobileAppAssets/company?${params.toString()}`
      );
      return res.data as IPagedMobileAssets;
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

export default CompanyService;
