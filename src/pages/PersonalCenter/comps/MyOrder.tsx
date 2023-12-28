import React, { useState, useEffect } from "react";
import { Col, Row, Empty} from 'antd';
import "../css/MyOrder.scss";
import  OrderItem  from './OrderItem'
import { Tabs,Pagination } from "antd";
import { fetchOrderList } from "../../../apis/order"
const MyOrder: React.FC = () => {
  const [tabs] = useState([
    { name: "全部", key: "" },
    { name: "待付款", key: "0" },
    { name: "已付款", key: "1" },
  ]);
  const [activeTab, setActiveTab] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageRow] = useState(5);
  const [pageTotal,setPageTotal] = useState(0);
  const [tabData, setTabData] = useState([]);
  const changeTab = (id: any) => {
    setPageIndex(1);
    setActiveTab(id)
  };
  const onChange = (index:number)=>{
    setPageIndex(index)
  }
  useEffect(() => {
    const fetchTabs = async () => {
      const res = await fetchOrderList(activeTab,pageIndex,pageRow);
      setTabData(res.body);
      if(pageTotal !== res.page?.total){
        setPageTotal(res.page?.total)
      }
    };
    fetchTabs();
  }, [activeTab,pageIndex,pageRow,pageTotal]);

  return (
    <div className="order-my-content">
      <div className="order-tab-list">
          <Tabs
            tabPosition={"top"}
            style={{ height: 220 }}
            indicatorSize={(origin) => origin - 16}
            items={tabs.map((item: any) => {
              return {
                label: `${item.name}`,
                key: `${item.key}`,
              };
            })}
            onChange={changeTab}
          />
      </div>
      <div className="order-content">
          {tabData && tabData.length>0?
            <Row className="order-header">
            <Col span={12}>订单信息</Col>
            <Col span={4}>金额(元)</Col>
            <Col span={4}>实付款(元)</Col>
            <Col span={4}>状态</Col>
          </Row>
          :null}
          {
            tabData && tabData.length>0 ?tabData.map((order:any,index:number)=>{
              return (
                  <OrderItem odrer={order} ></OrderItem>
              )
            }): <Empty
            style={{marginTop:100}}
            image={
              <img src={require("../images/order-empty.png")} alt=""></img>}
            imageStyle={{ height: 172 }}
            description={<span style={{color:'#9FA1A4'}}>暂无订单</span>}
          >
          </Empty>
          }
         {
          tabData && tabData.length>0 ? <Pagination  onChange={onChange} total={pageTotal} showSizeChanger={false} pageSize={pageRow} current={pageIndex} />:null
         } 
      </div>
    </div>
  );
};

export default MyOrder;
