import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import BreadStore from "../../store/breadCrumb";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/index.scss";
function BreadcrumbCustom(props: any) {
  const [breadData, setBreadData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  let localtion = useLocation();
  const { pathname } = localtion;

  useEffect(() => {
    const data = BreadStore.getPageData();
    // 跳转后去除下层内容
    if (data?.length > 0) {
      let curIndex: any = 0;
      data.map((item: any, index: Number) => {
        var reg1 = new RegExp(":", "g"); // 加'g'，删除字符串里所有的":"
        item.href = item.href.replace(reg1, "");
        if (item.href == pathname) {
          curIndex = index;
        }
      });
      //如果非底层 执行去除当前页面的底层操作
      if (curIndex != data.length - 1) {
        deleteData(curIndex);
      }
    }
  }, [pathname]);
  const deleteData = (curIdex: number) => {
    let data = BreadStore.getPageData();
    let tempData: any = [];
    tempData = data.filter((x: any, index: number) => {
      return index <= curIdex;
    });
    BreadStore.setPageData(tempData);
  };

  const goToAny = (data: any) => {
    breadData.map((item: any, index: number) => {
      if (index != breadData.length - 1 && item == data) {
        navigate(data.href);
      }
    });
  };
  useEffect(() => {
    let temp = BreadStore.getPageData();
    setBreadData(temp);
  }, []);
  return (
    <div style={{backgroundColor:'#F6F6F8'}}>
      <div className="bread-box ">
        {breadData &&
          breadData.map((item: any, index: number) => {
            return (
              <div className="bread-one" key={index}>
                <div
                  onClick={() => {
                    goToAny(item);
                  }}
                  className="bread-one-text"
                >
                  {item.title}
                </div>
                {index != breadData.length - 1 ? (
                  <div className="bread-one-icon">{">"}</div>
                ) : null}
              </div>
            );
          })}
        {/* {
            <Breadcrumb items={breadData} separator='>'  />
        } */}
      </div>
    </div>
  );
}

export default BreadcrumbCustom;
