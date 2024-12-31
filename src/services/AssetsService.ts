import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";
import { IPagedAssets } from "@/types/IAssets";

const endpoint = "/Assets";

const AssetsService = {
  Get: async (
    pageNumber: number,
    pageSize: number,
    userId: number,
    domainName?: string,
    severityType?: SeverityTypeEnum
  ) => {
    try {
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        userId: userId.toString(),
      });

      if (domainName) {
        params.append("domainName", domainName);
      }

      if (severityType) {
        params.append("severityType", severityType.toString());
      }

      const res = await api.get(`${endpoint}/All?${params.toString()}`);
      return res.data as IPagedAssets;
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
export default AssetsService;
