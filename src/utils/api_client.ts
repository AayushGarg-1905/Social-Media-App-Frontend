import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpHeaders = {
    [key: string]: string;
};

export type RequestConfig<D = any> = AxiosRequestConfig<D>;

export interface IApiClient {
    post<TRequest, TResponse>(path: string, object: TRequest, config?: RequestConfig): Promise<AxiosResponse<TResponse>>;
    put<TRequest, TResponse>(path: string, object: TRequest, config?: RequestConfig): Promise<AxiosResponse<TResponse>>;
    get<TResponse>(path: string, config?: RequestConfig): Promise<AxiosResponse<TResponse>>;
    patch<TRequest, TResponse>(path: string, object: TRequest, config?: RequestConfig): Promise<AxiosResponse<TResponse>>;
    delete<TResponse>(path: string, config?:RequestConfig):Promise<AxiosResponse<TResponse>>;
}

export default class ApiClient implements IApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = Axios.create();
       
    }

    async post<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<AxiosResponse<TResponse>> {
        const response = await this.client.post<TResponse>(path, payload, config);
        return response;
    }

    async put<TRequest, TResponse>(path: string, payload: TRequest,config?: RequestConfig): Promise<AxiosResponse<TResponse>> {
        const response = await this.client.put<TResponse>(path, payload,config);
        return response;
    }

    async get<TResponse>(path: string, config?: RequestConfig): Promise<AxiosResponse<TResponse>> {
        const response = await this.client.get<TResponse>(path, config);
        return response;
    }
    
    async patch<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<AxiosResponse<TResponse>> {
        const response = await this.client.patch<TResponse>(path, payload, config);
        return response;
    }

    async delete<TResponse>(path: string, config?: RequestConfig): Promise<AxiosResponse<TResponse>> {
        const response = await this.client.delete<TResponse>(path,config);
        return response;
    }

}