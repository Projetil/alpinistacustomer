/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { IIntelligenceTimeLine, IRiskCards, ITotalDangers } from "@/types/ICharts";

const Tab3Service = {
    GetTotalDangers: async (companyId: number) => {
        try {
            const res = await api.get(`/Intelligence/Total?companyId=${companyId}`)

            return res.data as ITotalDangers
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
    GetCards: async (companyId: number) => {
        try {
            const res = await api.get(`/Intelligence/Data?companyId=${companyId}`)

            return res.data as IRiskCards
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
    GetTimeLine: async (companyId: number, year: number) => {
        try {
            const res = await api.get(`/Intelligence/TimeLine?companyId=${companyId}&year=${year}`)

            return res.data as IIntelligenceTimeLine[]
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

export default Tab3Service