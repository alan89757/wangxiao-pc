import { request } from "../utils/request"

export interface CourseProject {
  k: string
  v: string
}
//获取对应课程列表
export function fetchGetCourseList(
  id: string | null
  // pageIndex: number,
  // pageSize: number
) {
  return request({
    url: `/shelves/my/lessons`,
    method: "GET",
    params: {
      id,
      // pageIndex,
      // pageSize,
    },
  })
}

export interface CourseProject {
  k: string
  v: string
}
//获取我的课程所有项目
export function fetchGetCourseProjectList(): Promise<CourseProject[]> {
  return request({
    url: `/shelves/my/lesson/projects`,
    method: "GET",
  })
}
// 搜索课程
export function searchCourseList(data: any) {
  return request({
    url: `/shelves/commodity/search`,
    method: "POST",
    data,
  })
}
