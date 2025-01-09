/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import {
  ICriticityHome,
  ITab4And5HomeTable,
  IStatusHome,
  ITimeLineHome,
  IIrrHome,
} from "@/types/ITab4And5";

const Tab4And5HomeService = {
  GetCriticity: async (tab: string, companyId: number) => {
    try {
      const res = await api.get(
        `/${tab}/Criticity${companyId ? `?companyId=${companyId}` : ""}`
      );
      return res.data as ICriticityHome;
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
  GetStatus: async (tab: string, companyId: number) => {
    try {
      const res = await api.get(
        `/${tab}/Status${companyId ? `?companyId=${companyId}` : ""}`
      );
      return res.data as IStatusHome;
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
  GetEnvironment: async (tab: string, companyId: number) => {
    try {
      const res = await api.get(
        `/${tab}/Environment${companyId ? `?companyId=${companyId}` : ""}`
      );
      return res.data as ITab4And5HomeTable[];
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
  GetAge: async (tab: string, companyId: number) => {
    try {
      const res = await api.get(
        `/${tab}/Age${companyId ? `?companyId=${companyId}` : ""}`
      );
      return res.data as ITab4And5HomeTable[];
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
  GetAssets: async (tab: string, companyId: number) => {
    try {
      const res = await api.get(
        `/${tab}/Assets${companyId ? `?companyId=${companyId}` : ""}`
      );
      return res.data as ITab4And5HomeTable[];
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
  GetTimeLine: async (tab: string, companyId: number, month: number) => {
    try {
      const res = await api.get(
        `/${tab}/TimeLine${companyId ? `?companyId=${companyId}` : ""}${
          month ? `&month=${month}` : ""
        }`
      );
      return res.data as ITimeLineHome[];
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
  GetSeverity: async (tab: string, companyId: number) => {
    try {
      const res = await api.get(
        `/${tab}/Assets${companyId ? `?companyId=${companyId}` : ""}`
      );
      return res.data as ITab4And5HomeTable[];
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
  GetIrr: async (tab: string, companyId: number) => {
    try {
      const res = await api.get(
        `/${tab}/IRR${companyId ? `?companyId=${companyId}` : ""}`
      );
      return res.data as IIrrHome;
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

export default Tab4And5HomeService;
