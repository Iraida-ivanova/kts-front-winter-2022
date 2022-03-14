import { HTTPMethod } from "utils/HTTPMethod";

export type RequestParams<ReqT> = {
  method: HTTPMethod; // Метод запроса, GET или POST
  endpoint: string; // API-endpoint, на который делается запрос
  headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками
  data: ReqT;
};

export enum StatusHTTP {
  Success = 200,
  BadRequest = 400,
  UnExpectedError = "UnExpectedError",
}

export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: number | string;
    }
  | {
      success: false;
      data: ErrorT;
      status: number | string;
    }
  | {
      success: false;
      data: Error;
      status: StatusHTTP;
    };

export interface IApiStore {
  readonly baseUrl: string;
  request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>>;
}
