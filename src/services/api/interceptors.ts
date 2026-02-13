import { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Request interceptor
export const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  console.log('Interceptor: Request sent', config.url);
  // You can add authentication tokens or other headers here
  // For example: config.headers.Authorization = `Bearer ${token}`;
  return config;
};

// Error handler for interceptors
export const onError = (error: AxiosError): Promise<AxiosError> => {
  console.error('Interceptor: Request Error', error);
  return Promise.reject(error);
};
