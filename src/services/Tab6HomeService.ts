/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { GetThirthDataRequest, GetThirthDataResponse } from "@/types/ICharts";

const Tab6Service = {
  GetThirthData: async (request: GetThirthDataRequest) => {
    try {
      let url = `/Thirth/Table?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`;
      if (request.companyId) {
        url += `&companyId=${request.companyId}`;
      }
      if (request.orderByColumn) {
        url += `&orderByColumn=${request.orderByColumn}`;
      }

      url += `&ascending=${request.ascending}`;

      const res = await api.get(url);
      return res.data as GetThirthDataResponse;
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

export default Tab6Service;
