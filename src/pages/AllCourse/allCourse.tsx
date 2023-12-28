import { useState, useEffect } from "react";
import {
  getAllCourse,
  getPopularList,
  getCourseByProject,
  commoditySearch,
} from "../../apis/allCourseName";
import { useParams } from "react-router-dom";
import { Pagination } from "antd";
import Breadcrumb from "../../components/BreadCrumb";
import { handleBread } from "../../utils/bread";
import { useNavigate } from "react-router-dom";
// import getOtherCourse from "../../apis/allCourseName";
import "./css/allCourse.scss";

function AllCourse() {
  const params: any = useParams(); //用于获取url
  const navigate = useNavigate();
  const [tabList, setTabList] = useState([]);
  const [activeKey, setActiveKey] = useState(); //当前的key值
  const [current, setcurrent] = useState(1); //当前页码
  const [total, setTotal] = useState(0); //总页面数
  const [infoType, setInfoType] = useState(4);
  const [cardList, setCardList] = useState([
    //课程列表
  ]);

  // 课程名称查询
  const handleCommoditySearch = async (params: any) => {
    const res: any = await commoditySearch({
      commodityName: params.id,
      type: 1,
      status: 0,
      index: 0,
      row: 10,
    });
    console.log(res, "test111");
    setCardList(res.body);
    setcurrent(res.page.current);
    setTotal(res.page.total);
  };

  useEffect(() => {
    if (params.type === "search") {
      handleCommoditySearch(params);
    } else if (params.type == 3 || params.type == 2) {
      setInfoType(3);
      //调接口查
      getInfoByproject(params.id);
    } else if (params.type == 4) {
      setInfoType(4);
      getPopularInfo(current);
      // getOtherCourse()
    } else if (params.type == 5) {
      setInfoType(5);
      getInfoByproject(params.id);
    }
  }, [params]);

  //page当前的页码、infotype信息类型
  const changePage = (page: number) => {
    setcurrent(page);
    if (infoType == 3) {
      getInfoByproject(params.id);
    } else if (infoType == 4) {
      getPopularInfo(page);
    } else if (infoType == 5) {
      getInfoByproject(params.id);
    }
  };

  //获取所有课程信息、current表示当前页码，tagid表示课程标签id
  const getAllCourseInfo = async (current: number, tagId?: string) => {
    let res = [];
    res = tagId
      ? await getAllCourse(current - 1, 12, tagId)
      : await getAllCourse(current - 1, 12);
    setCardList(res.body);
    setcurrent(res.page.current);
    setTotal(res.page.total);
  };

  //获取热门课程
  const getPopularInfo = async (current: number) => {
    const res: any = await getPopularList(current - 1, 12);
    setCardList(res.body);
    setcurrent(res.page.current);
    setTotal(res.page.total);
  };

  const getInfoByproject = async (projecId: number) => {
    const res = await getCourseByProject(projecId, current - 1, 12);
    setCardList(res.body);
    setcurrent(res.page.current);
    setTotal(res.page.total);
  };

  const changeTab = (item: any) => {
    setActiveKey(item.key);
    //传id调接口
    if (item.key === "all") {
    } else {
      getAllCourseInfo(current, item.key);
    }
  };

  // 课程详情
  const goToDetail = (item: any) => {
    handleBread({ title: `${item.name}`, href: `/courseDetail/${item.id}` });
    navigate(`/courseDetail/${item.id}`);
  };

  return (
    <div className="allcourse-box">
      <Breadcrumb />

      {/* 课程项目id */}

      {tabList ? (
        tabList.map((item: any, index: number) => {
          return (
            <div className="projectTab-box">
              <div className="projectTab-content">
                <div className="fenlei">项目分类:</div>
                <div className="projectItem">
                  <span
                    onClick={() => changeTab(item)}
                    className={index === activeKey ? "activeItem" : ""}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      {/* 全部课程 */}
      <div className="allcourse-content">
        <div className="allcourse-all">
          <div className="allcourse-top">
            <div className="allcourse-name">全部课程</div>
            <div className="allcourse-total">共找到{total}+结果</div>
          </div>
          <div className="allcourse-list">
            {cardList.map((item: any) => {
              return (
                <li className="allcourse-item" onClick={() => goToDetail(item)}>
                  <div className="item-imgs">
                    <img src={item.thumbnail} alt="" />
                    <div className="sellingnumber">
                      {item.salesVolume ? item.salesVolume : 0}人已关注
                    </div>
                  </div>
                  <div className="bottom-box">
                    <div className="item-name">{item.name}</div>
                    <div className="item-sellpoint">{item.sellingPoint}</div>
                    <div className="item-bottom">
                      <div className="item-teacherList">
                        {item.teachers
                          ? item.teachers.map((info: any, index: number) => {
                              return index < 3 ? (
                                <div className="teacher-item">
                                  <img src={info.photo} alt="" />
                                  <p>{info.name}</p>
                                </div>
                              ) : null;
                            })
                          : null}
                      </div>
                      <div className="item-pricebox">
                        <p className="item-lineprice">{item.linePrice}起</p>
                        <p className="item-realPrice">{item.price}起</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
          <div className="pagination-box">
            <Pagination
              defaultCurrent={1}
              total={total}
              current={current}
              pageSize={12}
              onChange={changePage}
              hideOnSinglePage={true}
            />
          </div>
        </div>
      </div>

      {/* 底部栏 */}

            
    </div>
  );
}
export default function AllCoursePage() {
  return <AllCourse></AllCourse>;
}
