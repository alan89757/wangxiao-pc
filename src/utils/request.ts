import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { transform, isFunction } from "./helper";
import { getBaseUrl } from "../config/index";
// import { RequestOptions } from "../types/axios";
import userStore from "../store/user";

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  // timeout: 6000,
  headers: {
    // "client-channel-id": "f7rs2cg4arhi2sqqke1o3j5",
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    config.headers["Authorization"] = `Thor ${userStore.getToken()}`;
    config.headers["platform"] = "pc";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const request = <T = any>(
  config: AxiosRequestConfig,
  options?: any
): Promise<T> => {
  return new Promise((resolve, reject) => {
    instance
      .request<any, AxiosResponse<any>>(config)
      .then((res: any) => {
        const { transformRequestHook } = transform;
        if(transformRequestHook && isFunction(transformRequestHook)) {
          let ret = transformRequestHook(res, options);
          if(ret) {
            resolve(ret)
          }
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export default instance;
