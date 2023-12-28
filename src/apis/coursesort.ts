import { request } from '../utils/request'
import { projectData } from "./mock";
// 获取项目分类展开结构
export function fetchClassifyExpansion(params: any) {
    // return new Promise((resolve, reject)=>{
    //     resolve(projectData);
    // })
    return request({
      url:`/base/construct/tag/scene`,
      method: 'GET',
      params,
    })
  }