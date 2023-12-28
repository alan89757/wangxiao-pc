import { request } from "../utils/request";
export function getGoodsDeatil(id: String) {
  return request({
    url: `/shelves/commodity/?isSubjectProduct=true&id=${id}`,
    method: "GET",
  });
}
export function fetchGetStudyStat(data: any) {
  return request({
    url: `/shelves/commodity/getStudyStat`,
    method: "POST",
    data,
  });
}
// 获取商品活动信息
export function getActivityInfo(commodityId: String) {
  return new Promise<any>(async (resolve) => {
    let res = await request({
      url: `/util/activity/group?commodityId=${commodityId}`,
    });
    res = res ?? {};
    res.skuData = res?.skuData?.map((item: any) => {
      // 原价缓存 拼团用
      item.price1 = item.price;
      item.price = item.amount;
      // 无库存则默认10000件
      item.stock = Math.min(
        item.stock ?? 10000,
        item.overplus ?? 10000,
        item.quantity ?? 10000
      );
      return item;
    });
    resolve(res);
  });
}
// 获取优惠卷信息
export function getCouponList(commodityId: String) {
  return request({
    url: `/util/coupon/list?commodityId=${commodityId}`,
    method: "GET",
  });
}
// 领取优惠劵 util/coupon/receive?id=ac000000085
export function receiveCoupon(id:String) {
  return request({
     url:`util/coupon/receive?id=${id}`,
     method: "POST",
  })
}

