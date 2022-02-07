import qs from "qs";
import {ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP,} from "./types";
// import {throws} from "assert";
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;

export default class ApiStore implements IApiStore {
    readonly baseUrl:string;
    constructor(baseUrl: string) {
        this.baseUrl= baseUrl;
    }

   async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let options = {};
        let url:string = this.baseUrl + params.endpoint;
        if (params.method === HTTPMethod.GET){
            url = `${url}?${qs.stringify(params.data)}`;
            options = {
                method: params.method,
                headers: params.headers,
            }
        }
        else if (params.method === HTTPMethod.POST) {
            options = {
                method: params.method,
                headers: {...params.headers, 'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(params.data)
            }
        }


        try {
            let response = await fetch(url, options);
            if (response.ok) {
                return {
                    success: true,
                    data: await response.json(),
                    status: StatusHTTP.Success,
                }
            } else {
                return {
                    success: false,
                    data: await response.json(),
                    status: StatusHTTP.BadRequest,
                }
            }
        } catch (error) {
            return {
                success: false,
                data: error,
                status: StatusHTTP.UnExpectedError,
            }
        }

    }
}