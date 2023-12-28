import { request } from "../utils/request";
export function exchangeActivationCode(code: Number) {
  return request({
    url: `/agent/activation/code/exchange?code=${code}`,
    method: "GET",
  });
}
export function exchangeCode(data: any) {
  return request({
    url: `/util/activity/code/exchange`,
    method: "POST",
    data,
  });
}
export function getGoodsRechargeList(params?: any) {
  return request({
    url: `/agent/activation/code/records`,
    method: "GET",
    params,
  });
}
