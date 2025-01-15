import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { IAssetEnvironment } from "@/types/IAssetsEnvironment";

/* eslint-disable @typescript-eslint/no-explicit-any */
const endpoint = "/AssetsEnvironment";

const AssetsEnviromentService = {
  GetAll: async (
    pageNumber: number,
    pageSize: number,
    assetId?: number,
    environmentId?: number
  ) => {
    try {
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      });

      if (assetId) {
        params.append("assetId", assetId.toString());
      }

      if (environmentId) {
        params.append("environmentId", environmentId.toString());
      }

      const res = await api.get(`${endpoint}?${params.toString()}`);

      return res.data as IAssetEnvironment[];
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

export default AssetsEnviromentService;
