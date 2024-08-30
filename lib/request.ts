import { WrapResponse } from '@/types/http';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const request = axios.create({
  baseURL: '/',
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    const { message, response } = error;
    const status = response?.status;
    switch (status) {
      case undefined:
        throw message;
      case 401:
        throw 'Unauthorized';
      case 403:
        throw 'Forbidden';
      case 404:
        throw 'Not Found';
      case 500:
        throw 'Internal Server Error';
      case 503:
        throw 'Service Unavailable';
      default:
        if (status >= 400 && status < 500) {
          throw 'Client Error';
        } else if (status >= 500) {
          throw 'Server Error';
        }
    }
  }
);

export default (() => ({
  get<T>(url: string, config?: AxiosRequestConfig<any> | undefined) {
    return request.get<any, WrapResponse<T>>(url, config);
  },
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    return request.post<any, WrapResponse<T>>(url, data, config);
  },
}))();
