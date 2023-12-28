import { useState, useEffect } from "react";
import AllInfoItem from "./comps/AllInfoItem";
import { Tabs, List } from "antd";
import { getAllInfoClassify, getInfoList } from "../../apis/information";
import BreadCrumb from "../../components/BreadCrumb";
import "./css/index.scss";

function AllInformation() {
  const [inforTab, setInfoTab] = useState<any>([]);
  const [data, setData] = useState([]);
  const [listIndex, setListIndex] = useState(0);
  const [currentId, setCurrentId] = useState<any>();
  const [current, setcurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const changeTab = (id: any) => {
    setData([]);
    setListIndex(0);
    getInfoListbyCategory(id, 0);
    setCurrentId(id);
  };
  const getInfoListbyCategory = async (id: any, index: number) => {
    const res = await getInfoList({
      classifyId: id,
      index,
      row: 10,
    });
    setData(res.body);
    setcurrent(res.page.current);
    setTotal(res.page.total);
  };
  const changePages = (current: number) => {
    getInfoListbyCategory(currentId, current - 1);
  };

  useEffect(() => {
    const getInfoTab = async () => {
      const res = await getAllInfoClassify();
      setInfoTab(res.body);
      // setCurrentId(res.body[0].key);
      getInfoListbyCategory(res.body[0].key, 0);
    };
    getInfoTab();
  }, []);
  return (
    <div className="information-content-outwrap">
      <BreadCrumb />
      {/* 内容 */}
      <div className="content">
        <div className="info-content">
          <div className="course-tab-list">
            <Tabs
              tabPosition={"top"}
              style={{ height: 220 }}
              indicatorSize={(origin) => origin - 16}
              items={inforTab.map((item: any) => {
                return {
                  label: `${item.value}`,
                  key: `${item.key}`,
                  // children: `Content of tab ${id}`,
                };
              })}
              onChange={changeTab}
            />
          </div>
          <div id="scrollableDiv">
            <List
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 10,
                onChange: changePages,
                defaultCurrent: 1,
                current: current,
                total: total,
                hideOnSinglePage:true
              }}
              dataSource={data}
              renderItem={(item, index) => (
                <AllInfoItem item={item} index={index} />
                // <List.Item>

                // </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AllInformation;
