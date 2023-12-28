import { ENV_DEV, ENV_TEST, ENV_PROD } from "./const";

// 获取当前环境
export function getEnv() {
  const url = window.location.host;
  if (url.indexOf("embryon") > -1 || url.indexOf("localhost") > -1) {
    return ENV_DEV;
  } else if (url.indexOf("chestnut") > -1) {
    return ENV_TEST;
  } else {
    return ENV_PROD;
  }
}

// 接口地址
export function getBaseUrl() {
  const env = getEnv();
  if (env === ENV_DEV) {
    return "https://embryon-develop.wangxiao.cn";
  } else if (env === ENV_TEST) {
    return "https://chestnut-develop.wangxiao.cn";
  } else {
    return "https://develop.wangxiao.cn";
  }
}

// CDN地址
export function getCDNUrl() {
  const env = getEnv();
  if (env === ENV_DEV) {
    return "https://embryon-acc.wangxiao.cn";
  } else if (env === ENV_TEST) {
    return "https://chestnut-acc.wangxiao.cn";
  } else {
    return "https://acc.wangxiao.cn";
  }
}
