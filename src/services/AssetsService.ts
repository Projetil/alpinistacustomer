import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";
import { IPagedAllAssets } from "@/types/IAllAssets";
import { NmapTypeEnum } from "@/enums/NmapTypeEnum";
import { IPagedInfraAssets } from "@/types/IInfraAssets";
import { IPagedWebAssets } from "@/types/IWebAssets";
import { IPagedMobileAssets } from "@/types/IMobileAssets";
import { IPagedDomainAssets } from "@/types/IDomainAssets";
import { IPagedPeopleAssets } from "@/types/IPeopleAssets";
import { IPagedEnvironmentAssets } from "@/types/IEnvironmentAssets";
import { EnvironmentTypeEnum } from "@/enums/EnvironmentTypeEnum";

const endpoint = "/Assets";

const AssetsService = {
  GetAll: async (
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
      return res.data as IPagedAllAssets;
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
  GetInfras: async (
    pageNumber: number,
    pageSize: number,
    userId: number,
    type: NmapTypeEnum,
    domainName?: string,
    severityType?: SeverityTypeEnum
  ) => {
    try {
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        userId: userId.toString(),
        type: type.toString(),
      });

      if (domainName) {
        params.append("domainName", domainName);
      }

      if (severityType) {
        params.append("severityType", severityType.toString());
      }

      const res = await api.get(`${endpoint}/Infra?${params.toString()}`);
      return res.data as IPagedInfraAssets;
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
  GetWebs: async (
    pageNumber: number,
    pageSize: number,
    userId: number,
    type: NmapTypeEnum,
    domainName?: string,
    severityType?: SeverityTypeEnum
  ) => {
    try {
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        userId: userId.toString(),
        type: type.toString(),
      });

      if (domainName) {
        params.append("domainName", domainName);
      }

      if (severityType) {
        params.append("severityType", severityType.toString());
      }

      const res = await api.get(`${endpoint}/Web?${params.toString()}`);
      return res.data as IPagedWebAssets;
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
  GetMobiles: async (
    companyId: number,
    pageNumber: number,
    pageSize: number,
    appName?: string,
    sortColumn?: "Id" | "AppName" | "Store",
    sortDirection?: "ASC" | "DESC"
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("CompanyId", companyId.toString());
      params.append("PageNumber", pageNumber.toString());
      params.append("PageSize", pageSize.toString());

      if (appName) {
        params.append("AppName", appName);
      }

      if (sortColumn) {
        params.append("SortColumn", sortColumn);
      }

      if (sortDirection) {
        params.append("SortDirection", sortDirection);
      }

      const res = await api.get(
        `/CompanyMobileAppAssets/company/?${params.toString()}`
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
  GetDomains: async (
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

      const res = await api.get(`${endpoint}/Domain?${params.toString()}`);
      return res.data as IPagedDomainAssets;
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
  GetPeoples: async (
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

      const res = await api.get(`${endpoint}/People?${params.toString()}`);
      return res.data as IPagedPeopleAssets;
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
  GetEnvironments: async (
    pageNumber: number,
    pageSize: number,
    userId: number,
    environmentTypeEnum: EnvironmentTypeEnum,
    domainName?: string,
    severityType?: SeverityTypeEnum
  ) => {
    try {
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        userId: userId.toString(),
        environmentTypeEnum: environmentTypeEnum.toString(),
      });

      if (domainName) {
        params.append("domainName", domainName);
      }

      if (severityType) {
        params.append("severityType", severityType.toString());
      }

      const res = await api.get(`${endpoint}/Environment?${params.toString()}`);
      return res.data as IPagedEnvironmentAssets;
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
