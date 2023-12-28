import React, { useState, useEffect } from "react";
// import { fetchGetCourseName} from "../../apis/allCourseName"
import { async } from "q";
import { log } from "console";
import { getPopularCourse } from "../../apis/allCourseName";
import { getOtherCourse } from "../../apis/allCourseName";
import { getProjectIds } from "../../apis/allCourseName";
import { getRecommendProjectIds } from "../../apis/allCourseName";
import { getRecommendCourses } from "../../apis/allCourseName";

import { getAllCourse } from "../../apis/allCourseName";
// import { getRecommendCourse } from "../../apis/allCourseName";
// import { getProjectIds } from "../../apis/allCourseName";
import { useNavigate } from "react-router-dom";
import { handleBread } from "../../utils/bread";
import "../Home/css/recommend.scss";

function Recommend() {
  const navigate = useNavigate();
  const [courseCard, setCourseCardList] = useState([]); // 全部课程 -卡片
  const [courseRecommondCard, setCourseRecommondCardList] = useState([]); // 推荐课程-卡片
  const [projectList, setProjectList] = useState<any>([]); // 列表
  const [currentTab1, setCurrentTab1] = useState(0); // 全部课程的tab切换
  const [currentTab2, setCurrentTab2] = useState(0); // 推荐课程的tab切换
  const [recommendCourse, setRecommendCourse] = useState<any>([]); // 推荐课程 -项目
  const [curRecommedProjectId, setCurRecommendProjectId] = useState(); // 推荐课程的当前项目id

  // 获取全部课程-项目信息
  const getProjectIdInfoAllCourse = async () => {
    let arr = [{ value: "热门课程", key: "hotCourse" }];
    const res = await getProjectIds();
    if (res?.length > 0) {
      res.forEach((item: any) => {
        arr.push(item);
      });
    }
    setProjectList(arr);
  };
  // 获取推荐课程-项目信息
  const getProjectIdInfoRecomCourse = async () => {
    const res = await getRecommendProjectIds();
    setRecommendCourse(res);
    if (res?.length > 0) {
      setCurRecommendProjectId(res[0]?.key);
    }
  };
  // 更改全部课程-选中项目
  const changeProject = async (item: any, index: any) => {
    setCurrentTab1(index);
    if (item.key == "hotCourse") {
      getHotClassInfo();
    } else {
      getOtherClassInfo(item.key);
    }
    //  const res = await getPopularCourse(item.id);
  };
  // 更改推荐课程-选中项目
  const clickRecommendCourse = async (item: any, index: any) => {
    setCurrentTab2(index);
    setCurRecommendProjectId(item.key);
    // getProjectIdInfoRecomCourse();
    // getRecommendCoursesInfo(item.key);
    //  const res = await getPopularCourse(item.id);
  };

  // 去往课程详情页
  const goCourseDetail = (item: any) => {
    handleBread({ title: `${item.name}`, href: `/courseDetail/${item.id}` });
    navigate(`/courseDetail/${item.id}`);
  };
  // 获取热门课程的课程列表
  const getHotClassInfo = async () => {
    const res = await getPopularCourse();
    let result: any = [];
    if (res?.length > 0) {
      res.push({ title: "查看更多" });
      result = res;
    } else {
      result = [{ title: "查看更多" }];
    }
    // res.push({ title: "查看更多" });
    setCourseCardList(result);
    // setData(res)

    // console.log(res);
  };
  // 获取非热门课程的课程列表-byid
  const getOtherClassInfo = async (key: any) => {
    const res = await getOtherCourse(key, 0, 7);
    res.push({ title: "查看更多" });
    setCourseCardList(res);
  };

  useEffect(() => {
    getProjectIdInfoAllCourse();
    getHotClassInfo();
    getProjectIdInfoRecomCourse();
    // getRecommendCoursesInfo()
  }, []);
  useEffect(() => {
    if (curRecommedProjectId) {
      getRecommendCoursesInfo(curRecommedProjectId);
    }
  }, [curRecommedProjectId]);

  // 获取项目下推荐课程列表
  const getRecommendCoursesInfo = async (key: any) => {
    const res = await getRecommendCourses(key, 0, 4);
    setCourseRecommondCardList(res);
  };
  // 顶部的查看更多
  const checkAllTop = () => {
    handleBread({ title: `全部课程`, href: `/allCourse/4/1` });
    navigate(`/allCourse/4/1`);
  };
  // 带项目的查看更多
  const checkMoreByPro = () => {
    if (currentTab1 == 0) {
      handleBread({ title: "全部课程", href: `/allCourse/4/1` });
      navigate(`/allCourse/4/1`);
    } else {
      handleBread({
        title: `${projectList[currentTab1].value}`,
        href: `/allCourse/5/${projectList[currentTab1].key}`,
      });
      navigate(`/allCourse/5/${projectList[currentTab1].key}`);
    }
  };
  const [recommendList, setrecommendList] = useState([]);

  return (
    <div className="page-content">
      <div className="content-wrap">
        <div className="setmeal-groups">
          <div className="setmeal-group seckill-group">
            <div className="group-top clear">
              <div className="top-all">
                <div className="group-title activity-title fl">全部课程</div>
                {/* <br /> */}
                <div className="show-morename" onClick={() => checkAllTop()}>
                  查看更多{" "}
                  <span className=" more-icon-01 iconfont icon-symbol_right"></span>
                </div>
              </div>
              <div className="show-more fl">
                <ul className="exam-list fl">
                  {projectList.map((item: any, index: Number) => {
                    return (
                      <li
                        onClick={() => changeProject(item, index)}
                        key={item.key}
                        data-classNameify="seckill"
                        data-sign="jz1"
                        className={
                          currentTab1 === index
                            ? "exam-item exam-active"
                            : "exam-item"
                        }
                        style={{ marginLeft: index == 0 ? 0 : 40 }}
                      >
                        {item.value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="setmeal-swiper container">
              <div id="seckillSwiper" className="swiper-container">
                <div className="swiper-wrapper parent">
                  {courseCard.map((item: any, indexZ: number) => {
                    if ((indexZ != courseCard.length - 1)) {
                      return (
                        <div
                          key={indexZ}
                          className={
                            indexZ > 3
                              ? "swiper-slide setmeal-item setmeal-seckill child card-all-top"
                              : '"swiper-slide setmeal-item setmeal-seckill child"'
                          }
                          onClick={() => goCourseDetail(item)}
                        >
                          <img src={item.thumbnail} className="setmeal-pic" />
                          <div className="setmeal-title line-one">
                            {item.name}
                          </div>
                          <div className="course-label-introduction line-one">
                            <span style={{marginLeft:'16px'}}>{item?.sellingPoint}</span>
                          </div>
                          <div className="bottom-box">
                            <div className="teacher-box">
                              {item?.teachers?.length > 0 ? (
                                <div style={{ display: "flex" }}>
                                  {item.teachers.map(
                                    (child: any, index: number) => {
                                      if (index < 3) {
                                        return (
                                          <div className="teacher-one">
                                            <img
                                              src={child.photo}
                                              className="teacher-img-l"
                                            />
                                            <div className="teacher-name-l">
                                              {child.name}
                                            </div>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                              ) : null}
                            </div>
                            <div className="price-box">
                              <div className="line-price">
                                <span>￥</span>
                                <span className="false-price">
                                  {item.linePrice}
                                </span>
                                <span>起</span>
                              </div>
                              <div className="real-price">
                                <span className="ele">￥</span>
                                <span className="true-price">{item.price}</span>
                                <span className="ele2">起</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } 
                    else if(courseCard.length>7){
                      return (
                        <div
                          key={indexZ}
                          className={
                            indexZ > 3
                              ? "swiper-slide setmeal-item setmeal-seckill child card-all-top"
                              : '"swiper-slide setmeal-item setmeal-seckill child"'
                          }
                          onClick={() => checkMoreByPro()}
                        >
                          <div className="course-label-introduction-more">
                            查看更多
                            <span className="more-icon iconfont  icon-symbol_right"></span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 推荐课程 */}
          <div className="setmeal-group recommend-course recommend-top">
            <div className="group-top clear">
              <div className="top-all-recommend">
                <div className="group-title activity-title fl">推荐课程</div>
                <br />
                <div className="exam-list fl center">
                  <ul>
                    {recommendCourse &&
                      recommendCourse?.length > 0 &&
                      recommendCourse.map((item: any, index: Number) => {
                        return (
                          <li
                            onClick={() => clickRecommendCourse(item, index)}
                            key={item.key}
                            data-classNameify="free"
                            data-sign="gongcheng"
                            className={
                              currentTab2 === index
                                ? "exam-item exam-active"
                                : "exam-item"
                            }
                          >
                            {item.value}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="setmeal-swiper">
              <div id="freeSwiper" className="swiper-container-recommed">
                <div className="recommed-box">
                  <div className="swiper-wrapper-recommend">
                    {courseRecommondCard &&
                      courseRecommondCard?.length > 0 &&
                      courseRecommondCard.map((item: any, indexS: number) => {
                        return (
                          <div
                            className={
                              indexS == 1 || indexS == 3
                                ? "recommend-card recommend-right"
                                : "recommend-card"
                            }
                            style={{ marginTop: indexS > 1 ? 17 : 0 }}
                            onClick={() => goCourseDetail(item)}
                          >
                            <img src={item?.thumbnail} className="left-img" />
                            <div className="right-card">
                              <div className="right-card-name line-one">
                                {item?.name}
                              </div>
                              <div className="right-card-sellingPoint">
                                {item?.sellingPoint}
                              </div>
                              <div className="right-card-bottom">
                                <div className="recommend-teacher-box">
                                  {item?.teachers?.length > 0 ? (
                                    <div style={{ display: "flex" }}>
                                      {item.teachers.map(
                                        (child: any, index: number) => {
                                          if (index < 3) {
                                            return (
                                              <div className="teacher-one-recommed">
                                                <img
                                                  src={child.photo}
                                                  className="teacher-img-l-recommed"
                                                />
                                                <div className="teacher-name-l-recommed">
                                                  {child.name}
                                                </div>
                                              </div>
                                            );
                                          }
                                        }
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="price-recommed-box">
                                  <span className="recommed-price-icon">
                                    ￥
                                  </span>
                                  <span className="recommed-price-data">
                                    {item?.price}
                                  </span>
                                  <span className="recommed-price-text">
                                    起
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
