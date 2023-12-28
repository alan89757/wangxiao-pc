import { request } from "../utils/request"

//获取订单列表
export function fetchOrderList(
    status: string,
    index:number,
    row: number,
) {
  return request({
    url: `trade/order/channel`,
    method: "GET",
    params: {
        type:'cash',
        status,
        index,
        row,
    },
  }, {isTransformResponse:true})
}