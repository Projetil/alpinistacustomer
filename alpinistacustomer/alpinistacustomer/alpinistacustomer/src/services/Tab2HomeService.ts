/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { AttackSurfaceAssetsResponse, IAttackSurfaceRisks } from "@/types/ICharts";

const Tab2Service = {
    GetAssets: async (companyId: number) => {
        try {
            const res = await api.get(`/AttackSurface/Assets?CompanyId=${companyId}&PageNumber=1&PageSize=10`)

            return res.data as AttackSurfaceAssetsResponse
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
    GetRisks: async (companyId: number) => {
        try {
            const res = await api.get(`/AttackSurface/Risks?companyId=${companyId}`)

            return res.data as IAttackSurfaceRisks
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

export default Tab2Service