/* eslint-disable  */
import React, { useState, useEffect } from "react";
import CourseInfo from "./comps/CourseInfo";
import CourseContent from "./comps/CourseContent";
import { getGoodsDeatil, getActivityInfo } from "../../apis/courseDetail";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import "./css/index.scss";
import "./css/loginAlert.scss";
import "./css/pagination.scss";

function CourseDetail(props: any) {
  const params: any = useParams();
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    // console.log(params, "params");

    if (params.id) {
      getDetilData(params.id);
    }
  }, [params]);
  const getDetilData = async (id: String) => {
    const res = await getGoodsDeatil(id);
    const ret = await getActivityInfo(id);
    if (ret?.activityId) {
      res.activityType = ret.type;
      res.activityId = ret.activityId;
      res.skuList = ret?.skuData;
      res.inDate = ret.inDate;
      // setActivityId(ret?.activityId);
      // setAmount(ret?.amount);
    }
    setCourseData(res);
  };
  return (
    <div className="coursedetailOutwrap">
      <div className="course-wrap">
        <BreadCrumb />
        <CourseInfo courseData={courseData} />
        <CourseContent courseData={courseData} />
      </div>
    </div>
  );
}

export default CourseDetail;
