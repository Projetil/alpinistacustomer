/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { ICount, ICriticity, IHeader, IIdentifiedAndFixedIRR, IPizzaChartIRR, IService, ITableSeverity, ITimeCorrection } from "@/types/ICharts";


const Tab1Service = {
    GetHeader: async (companyId: number) => {
        try {
            const res = await api.get(`/All/Header?companyId=${companyId}`)

            return res.data as IHeader
        }
        catch(error: any){
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
    GetCriticity: async (companyId: number) => {
        try {
            const res = await api.get(`/All/Criticity?companyId=${companyId}`)

            return res.data as ICriticity[]
        }
        catch(error: any){
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
    GetRiskCount: async (companyId: number) => {
        try {
            const res = await api.get(`/All/Count?companyId=${companyId}`)

            return res.data as ICount[]
        }
        catch(error: any){
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
    GetService: async (companyId: number) => {
      try {
          const res = await api.get(`/All/Service?companyId=${companyId}`)

          return res.data as IService[]
      }
      catch(error: any){
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
    GetTimeCorrection: async (companyId: number) => {
      try {
          const res = await api.get(`/All/Time-Correction?companyId=${companyId}`)

          return res.data as ITimeCorrection[]
      }
      catch(error: any){
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
    GetPizzaChartIRR: async (month: number, companyId: number) => {
      try {
          const res = await api.get(`/All/IRR/Chart1?companyId=${companyId}&month=${month}`)

          return res.data as IPizzaChartIRR
      }
      catch(error: any){
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
    GetIdentifiedAndFixedIRR: async (year: number, companyId: number) => {
      try {
          const res = await api.get(`/All/IRR/Chart2And3?companyId=${companyId}&year=${year}` )

          return res.data as IIdentifiedAndFixedIRR[]
      }
      catch(error: any){
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
    GetTableSeverity: async (companyId: number) => {
      try {
          const res = await api.get(`/All/Table-Severity?companyId=${companyId}`)

          return res.data as ITableSeverity[]
      }
      catch(error: any){
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
}


export default Tab1Service