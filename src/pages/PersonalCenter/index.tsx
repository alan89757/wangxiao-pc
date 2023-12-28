import React, { useEffect, useState } from "react";
import MyCourse from "./comps/MyCourse";
import PersonalMessage from "./comps/PersonalMessage";
import ExchangeCourse from "./comps/ExchangeCourse";
import MyOrder from "./comps/MyOrder";
import TabItem from "./types";
import "./css/PersonalCenter.scss";
import { useSearchParams } from "react-router-dom";

function PersonalCenter() {
  //默认显示我的课程
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(
    <MyCourse />
  );
  //默认显示我的课程
  const [activeName, setActiveName] = useState<string>("我的课程");
  //tab栏列表
  const [tabItems, setTabItems] = useState<TabItem[]>([
    {
      component: <MyCourse />,
      name: "我的课程",
      isActive: true,
    },
    {
      component: <ExchangeCourse />,
      name: "课程激活",
      isActive: false,
    },
    {
      component: <MyOrder />,
      name: "我的订单",
      isActive: false,
    },
    {
      component: <PersonalMessage />,
      name: "个人资料",
      isActive: false,
    },
  ]);

  // 获取从topnav组件传过来的参数
  const [params] = useSearchParams();
  const topNavIndex: any = params.getAll("topNavIndex")[0];
  console.log(topNavIndex); // 个人资料编号是3
  // 从首页跳转到该页面时
  useEffect(() => {
    if (topNavIndex) {
      handleItemClick(topNavIndex)
    }
  }, []);

  const handleItemClick = (index: number, defaultSelected: boolean = false) => {
    // 更新活跃组件
    setActiveComponent(tabItems[index].component);
    setActiveName(tabItems[index].name);
    // 更新tab项的isActive状态
    const newTabItems = tabItems.map((item, itemIndex) => ({
      ...item,
      isActive: itemIndex == index || (defaultSelected && itemIndex === 0),
    }));
    setTabItems(newTabItems);
  };

  return (
    <div className="personal-cneter-outwrap">
      <div className="header">
        <div className="personalcenter">个人中心</div>
      </div>
      <div className="layout">
        <div className="l-container">
          {tabItems.map((item, index) => (
            <div
              key={index}
              className={`item ${item.isActive ? "active-item" : ""}`}
              onClick={() => handleItemClick(index)}
            >
              <span className="item-name">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="r-content">
          {activeName !== "课程激活" ? (
            <div className="active-name">{activeName}</div>
          ) : null}
          <div className="active-component">{activeComponent}</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalCenter;
