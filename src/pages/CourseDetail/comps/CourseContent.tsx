import React, { useState, useEffect } from "react";
import TeacherCard from "./TeacherCard";
import RecursionLevelList from "../../../components/CourseTree/RecursionLevelList";
import "../css/CourseContent.scss";
import { fetchGetStudyStat } from "../../../apis/courseDetail";
import { flatList, getProductIds } from "../../../utils/tree";
import QrcodeModal from "../../../components/QrcodeModal";

function CourseContent(props: any) {
  const { detail, productTrees, id: goodsId } = props.courseData;
  const [currentTab, setCurrentTab] = useState(0); //tab 0 -课程概述 1-课程目录
  const [teacherList, setTeacherList] = useState([]);
  const [list, setList] = useState([]);
  const [statics, setStatics] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 学习弹框
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // 设置二维码的url

  const initListData = async () => {
    if (!productTrees) {
      return;
    }
    // 利用缓存重新组织树结构
    const productIds = getProductIds(productTrees, "P");
    const statics1 = await fetchGetStudyStat({ productIds });
    const originList = flatList(productTrees, 1);
    setStatics(statics1);
    setList(originList);
  };

  useEffect(() => {
    initListData();
  }, [props.courseData.productTrees]);
  useEffect(() => {
    if (props?.courseData?.teachers) {
      setTeacherList(props.courseData.teachers);
    } else {
      setTeacherList([]);
    }
  }, [props?.courseData]);

  // 处理跳转到商品详情
  const handleCallback = () => {
    setQrCodeUrl(`${window.location.origin}/siteH5/#/page_commodity/commodity/pages/commodityBank?id=${goodsId}`)
    setIsModalOpen(true);
  };

  // 处理二维码弹框
  const handleCloseQrCode = ()=> {
    setIsModalOpen(false);
  }

  return (
    <div className="course-detail">
      <div className="detail-lf">
        <div className="tab-list">
          <div id="course-tab-list">
            <span
              className={currentTab == 0 ? "active" : ""}
              onClick={() => setCurrentTab(0)}
            >
              课程概述
            </span>
            <span
              className={
                currentTab == 1 ? "course-catalog active" : "course-catalog"
              }
              onClick={() => setCurrentTab(1)}
            >
              课程目录
              {/* <span className="shiting">试听</span> */}
            </span>
          </div>
        </div>
        <div id="course-tab-content" className="tab-content">
          {currentTab == 0 ? (
            <div className="course-describe-group">
              <div
                className="course-desc"
                dangerouslySetInnerHTML={{ __html: detail ? detail : "" }}
              ></div>
            </div>
          ) : (
            <div className="catalogue-group">
              <RecursionLevelList
                list={(list || []) as any}
                statics={statics}
                callback={handleCallback}
                isHideProgress={false}
                defaultExpan={true}
              />
            </div>
          )}
        </div>
      </div>
      <div className="detail-rg">
        <div className="common-teacher">
          <p className="title">讲师介绍</p>
          <div className="content-teacher">
            {teacherList?.length > 0 &&
              teacherList.map((item, index) => {
                return <TeacherCard info={item} key={index} index={index} />;
              })}
          </div>
        </div>
      </div>
      <QrcodeModal
        isShow={isModalOpen}
        type={"purchase"}
        onCloseQrCode={handleCloseQrCode}
        qrCodeUrl={qrCodeUrl}
      />
    </div>
  );
}

export default CourseContent;
