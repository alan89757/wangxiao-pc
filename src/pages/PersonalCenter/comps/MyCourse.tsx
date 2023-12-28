import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import {
  fetchGetCourseList,
  fetchGetCourseProjectList,
} from "../../../apis/course";
import { Course, CourseResponse, Tab } from "../types";
import QrcodeModal from "../../../components/QrcodeModal";
import "../css/MyCourse.scss";


const MyCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [tabs, setTabs] = useState<Tab[]>([{ key: "all", value: "全部" }]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false); // 手机H5学习或购买弹框

  const changeTab = (id: any) => {
    setActiveTab(id);
  };
  const gotoStudy = () => {
    setQrCodeModalOpen(true);
  };

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
      <div className="course-card">
        <img
          className="course-img"
          alt="course-img"
          src={require("../images/course-cover.png")}
        />
        <div className="course-info">
          <div className="course-title">{course.v}</div>
          <div className="course-use-time">{course.useTime}</div>
          <button className="course-button" onClick={gotoStudy}>
            手机学习
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getCourseProjects = async () => {
      try {
        const courseProjects = await fetchGetCourseProjectList();
        const projectsTabs: Tab[] = courseProjects.map((project) => ({
          key: project.k,
          value: project.v,
        }));
        setTabs([{ key: "all", value: "全部" }, ...projectsTabs]);
      } catch (error) {
        console.error("Error fetching course project list:", error);
      }
    };

    getCourseProjects();
  }, []);

  useEffect(() => {
    const getCourseListByTab = async () => {
      try {
        const id = activeTab === "all" ? "" : activeTab;
        const response: CourseResponse = await fetchGetCourseList(id);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching course list:", error);
      }
    };

    getCourseListByTab();
  }, [activeTab]);

  const handleCloseQrCode = () => {
    setQrCodeModalOpen(false);
  };

  return (
    <div className="my-course-container">
      <div className="tab-header">
        <div className="course-tab-list">
          <Tabs
            tabPosition={"top"}
            style={{ height: 220, maxWidth: 1000 }}
            items={tabs.map((item: any) => {
              return {
                label: `${item.value}`,
                key: `${item.key}`,
              };
            })}
            onChange={changeTab}
          />
        </div>
        {/* {tabs.map((tab) => (
            <div
            key={tab.key}
            className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.value}
            </div>
        ))} */}
      </div>

      {courses && courses.length > 0 ? (
        <div className="course-list">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      ) : (
        <div className="course-empty">
          <img src={require("../images/course-empty.png")} alt="course-empty" />
          <div className="course-emptyText">您还未购买课程，点击去看看~</div>
          <button>去购买课程</button>
        </div>
      )}
      <QrcodeModal
        isShow={qrCodeModalOpen}
        type={"study"}
        onCloseQrCode={handleCloseQrCode}
        qrCodeUrl={`${window.location.origin}/siteH5/#/pages/newCourse/index?current=1`}
      />
    </div>
  );
};

export default MyCourse;
