import qs from "qs";

import {
  ApiResponse,
  HTTPMethod,
  IApiStore,
  RequestParams,
  StatusHTTP,
} from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    let options = {};
    let url: string = this.baseUrl + params.endpoint;
    if (params.method === HTTPMethod.GET) {
      url = `${url}?${qs.stringify(params.data)}`;
      options = {
        method: params.method,
        headers: params.headers,
      };
    } else {
      options = {
        method: params.method,
        headers: {
          ...params.headers,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params.data),
      };
    }

    try {
      let response = await fetch(url, options);
      if (response.ok) {
        return {
          success: true,
          data: await response.json(),
          status: response.status,
        };
      } else {
        return {
          success: false,
          data: await response.json(),
          status: response.status,
        };
      }
    } catch (error) {
      return {
        success: false,
        data: error as Error,
        status: StatusHTTP.UnExpectedError,
      };
    }
  }
}
