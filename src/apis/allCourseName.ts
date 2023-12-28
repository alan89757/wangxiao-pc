import { wait } from "@testing-library/user-event/dist/utils";
import { request } from "../utils/request";

export function getProjectIds() {
  // return new Promise((resolve)=> {
  //   resolve(recommendData)
  // })

  const a = request({
    url: `/base/construct/recommend/project?type=1`,
    method: "GET",
  });

  return a;
}
export function getOtherCourse(projectId: any, index: number, row: number) {
  return request({
    url: `/shelves/commodity/display/list?isSubjectProduct=true`,
    method: "POST",
    data: {
      type: 1,
      index,
      row,
      projectId,
    },
  });
}
export function getPopularCourse() {
  return request({
    url: `/shelves/commodity/popular/commodity?row=7&index=0`,
    method: "GET",
  });
}

export function getRecommendProjectIds() {
  // return new Promise((resolve)=> {
  //   resolve(recommendData)
  // })
  return request({
    url: `/base/construct/recommend/project?type=2`,
    method: "GET",
  });
}

export function getRecommendCourses(
  projectId: any,
  index: number,
  row: number
) {
  // return new Promise((resolve)=> {
  //   resolve(recommendData)
  // })
  const data = {
    type: 5,
    index,
    row,
    projectId,
  };
  const resp = request({
    url: `/shelves/commodity/display/list`,
    method: "POST",
    data: data,
  });
  return resp;
}
export function getAllCourse(index: number, row: number, tagId?: string) {
  return request(
    {
      url: `/shelves/commodity/popular/commodity?index=${index}&row=${row}&tagId=${tagId}`,
      method: "GET",
    },
    {
      isTransformResponse: true,
    }
  );
}
export function getPopularList(index: number, row: number) {
  return request(
    {
      url: `/shelves/commodity/popular/commodity?row=${row}&index=${index}`,
      method: "GET",
    },
    {
      isTransformResponse: true,
    }
  );
}
export function getCourseByProject(projectId: any, index: number, row: number) {
  return request(
    {
      url: `/shelves/commodity/display/list?isSubjectProduct=true`,
      method: "POST",
      data: {
        type: 1,
        index,
        row,
        projectId,
      },
    },
    {
      isTransformResponse: true,
    }
  );
}

// 搜索
export function commoditySearch(data: any) {
  return request(
    {
      url: `/shelves/commodity/search`,
      method: "POST",
      data,
    },
    {
      isTransformResponse: true,
    }
  );
}
