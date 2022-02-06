import qs from "qs";
import {ApiResponse, IApiStore, RequestParams} from "./types";
// import {throws} from "assert";
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;

export default class ApiStore implements IApiStore {
    readonly baseUrl:string = 'https://api.github.com';
    constructor(baseUrl: string) {
        this.baseUrl= baseUrl;
    }

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let options = {};
        let url:string = this.baseUrl;
        if (params.method === 'GET'){
            url += params.endpoint;
            options = {
                method: params.method,
                headers: params.headers,
            }
        }
        else if (params.method === 'POST') {
            options = {
                method: params.method,
                headers: params.headers,
                body: JSON.stringify(params.data)
            }
        }
        let response: Promise<ApiResponse<SuccessT, any>> = fetch(url, options)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
                    .then(body => {
                        return {
                            success: true,
                            data: body,
                            status: resp.status,
                        }
                    })
            } else {
                return {
                    success: resp.ok,
                    data: 'Ошибка сетевого запроса',
                    status: resp.status,
                }
            }
        })

        return response;

    }
}