import { useEffect, useState } from "react";

import InfoItem from "./InfoItem";
import { useNavigate } from "react-router-dom";
import { Empty, Tabs } from "antd";
import { getAllInfoClassify, getInfoList } from "../../apis/information";
import BreadStore from "../../store/breadCrumb";
import { handleBread } from "../../utils/bread";
import "./css/infoItem.scss";
import "./css/information.scss";

function Information() {
  const [inforTab, setInfoTab] = useState<any>([]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentTab] = useState(0); // 当前tab
  const changeTab = (id: any) => {
    getInfoListbyCategory(id);
  };
  const getInfoListbyCategory = async (id: Number) => {
    const res = await getInfoList({ classifyId: id, index: 0, row: 4 });
    setData(res.body || []);
    // setData([]);
  };
  useEffect(() => {
    const getInfoTab = async () => {
      const { body = [] } = await getAllInfoClassify();
      setInfoTab(body);
      const [cid = {}] = body;
      getInfoListbyCategory(cid?.key);
    };
    getInfoTab();
  }, []);
  const goAllInformation = () => {
    handleBread({ title: "全部资讯", href: "/AllInformation" });
    navigate("/AllInformation");
  };
  return (
    <div className="informationBox">
      <div className="info-top">
        <div className="info-title">热门资讯</div>
        <div className="more-btn" onClick={() => goAllInformation()}>
          {"查看更多 "}
          <span className="iconfont icon-symbol_right"></span>
        </div>
      </div>
      <div className="info-content">
        <div className="course-tab-list">
          <Tabs
            tabPosition={"top"}
            style={{ height: 220 }}
            tabBarStyle={{ fontSize: 40, color: "red" }}
            indicatorSize={(origin) => origin - 16}
            items={
              inforTab?.length > 0 &&
              inforTab.map((item: any) => {
                return {
                  label: `${item.value}`,
                  key: `${item.key}`,
                };
              })
            }
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
        <div className="infoList-content">
          {data.length > 0 ? (
            data?.map((item, index) => {
              return (
                <InfoItem
                  item={item}
                  current={currentTab}
                  index={index}
                  key={index}
                />
              );
            })
          ) : (
            <Empty description="暂无数据"/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Information;
