import React, { useState, useEffect } from "react";
import "../css/MyCourse.scss";
import "../css/ExchangeCode.scss";
import { Tabs } from "antd";
import ExchangeCode from "../comps/ExchangeCode";
import ExchangeRecord from "./ExchangeRecord";
const ExchangeCourse: React.FC = () => {
  const [tabs] = useState([{ name: "激活兑换码" }, { name: "商品兑换记录" }]);
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (id: any) => {
    setActiveTab(id);
  };
  return (
    <div className="exchangecodeOutwrap exhangecourse-container">
      <div className="tab-header">
        <div className="course-tab-list">
          <Tabs
            tabPosition={"top"}
            style={{ height: 220 }}
            indicatorSize={(origin) => origin - 16}
            items={tabs.map((item: any, index: Number) => {
              return {
                label: `${item.name}`,
                key: `${index}`,
              };
            })}
            onChange={changeTab}
          />
          {/* <div>
            {inforTab &&
              inforTab.map((item: any, index: any) => {
                return (
                  <span
                    key={index}
                    className={
                      currentTab == index
                        ? "course-catalog active"
                        : "course-catalog"
                    }
                    onClick={() => {
                      getInfoListbyCategory(item?.id);
                    }}
                  >
                    {item.name}
                  </span>
                );
              })}
          </div> */}
        </div>
      </div>
      <div className="exchange-content">
        {activeTab == 0 ? <ExchangeCode /> : <ExchangeRecord />}
      </div>
    </div>
  );
};

export default ExchangeCourse;
