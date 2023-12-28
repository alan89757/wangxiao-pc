import { request } from "../utils/request";
export function getAllInfoClassify() {
  return request(
    {
      url: `/util/info/all/classify`,
      method: "GET",
    },
    {
      isTransformResponse: true,
    }
  );
}
export function getInfoList(data: any) {
  return request(
    {
      url: `/util/info/page/list`,
      method: "POST",
      data,
    },
    {
      isTransformResponse: true,
    }
  );
}
export function getInfoDetail(id: Number) {
  return request({
    url: `/util/info/detail?id=${id}`,
    method: "GET",
  });
}
