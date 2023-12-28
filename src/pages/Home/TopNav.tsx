import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import "./css/topnav.scss";
import userStore from "../../store/user";
import { Modal } from "antd";
import Login from "../../components/Login"; // 登录
import { handleBread } from "../../utils/bread";
// import { fetchUserInfo } from "../../apis/user";
import { fetchClassifyExpansion } from "../../apis/coursesort";
import { ConsoleSqlOutlined } from "@ant-design/icons";
function TopNav() {
  const [isLogin, setIsLogin] = useState(false); // 登录的状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 点击后打开登录弹窗
  function handleToLogin() {
    setIsModalOpen(true);
  }

  // 处理登录
  const loginCallback = () => {
    setIsLogin(true);
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  // 获取首页的项目展开的数据
  const [projectData, setProjectData] = useState<any>([]);
  const getClassifyExpansion = async () => {
    const result = await fetchClassifyExpansion({});
    // 处理第二层数据
    if (result?.length > 0) {
      result.forEach((item: any) => {
        if (item.children?.length > 0) {
          item.childrenLevel2 = item.children.filter((x: any) => {
            return x?.type == 0;
          });
        }
      });
    }
    setProjectData(result);
  };

  useEffect(() => {
    getClassifyExpansion();
  }, []);

  const userInfo = userStore.getUserInfo();

  // 跳转到对应的一级标签
  const goTofirst = (item: any) => {
    console.log(item.key);
    handleBread({
      title: item.value,
      href: `/allCourse/1/${item.key}`,
    });
    navigate(`/allCourse/1/${item.key}`);
  };
  // 跳转到对应的二级标签
  const goToSecond = (item: any) => {
    handleBread({
      title: item.value,
      href: `/allCourse/2/${item.key}`,
    });
    navigate(`/allCourse/2/${item.key}`);
  };
  // 跳转到对应的项目
  const goToItem = (item: any) => {
    // console.log(key);
    handleBread({
      title: item.value,
      href: `/allCourse/3/${item.key}`,
    });
    navigate(`/allCourse/3/${item.key}`);
  };

  return (
    <div className="topnav-wrap">
      <div className="topnav-list">
        <div className="top-center-nav">
        <div className="course-classify fl">
          <ul className="classify-list">
            {projectData && projectData.length > 0
              ? projectData.map((item: any) => {
                  return (
                    <li className="classify-item">
                      <div className="classify-top clear">
                        <span
                          className="classify-title fl"
                          onClick={() => goTofirst(item)}
                        >
                          {item.value}
                        </span>
                        <span className="iconfont icon-symbol_right fr"></span>
                      </div>
                      <div className="hot-exams clear">
                        {item.childrenLevel2 && item.childrenLevel2.length > 0
                          ? item.childrenLevel2.map(
                              (child: any, childIndex: number) => {
                                return childIndex < 2 ? (
                                  <a
                                    className="hot-exam"
                                    onClick={() => goToSecond(child)}
                                  >
                                    {child.value}
                                  </a>
                                ) : null;
                                // if (
                                //   child.type !== undefined &&
                                //   child.type == 0
                                // ) {
                                //   return (
                                //     <a
                                //       className="hot-exam"
                                //       onClick={() => goToSecond(child)}
                                //     >
                                //       {child.value}
                                //     </a>
                                //   );
                                // }
                              }
                            )
                          : null}
                      </div>
                      <div className="exam-list">
                        {item.type != undefined && item.value == "其他" ? (
                          item.children && item.children.length > 0 ? (
                            <div className="exam-items clear">
                              <div className="exam-title">其他</div>
                              <div className="exam-title2">
                                {item.children.map((child: any) => {
                                  return (
                                    <a
                                      className="exam-item"
                                      onClick={() => goToItem(child)}
                                    >
                                      <span>{child.value}</span>
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null
                        ) : item.children && item.children.length > 0 ? (
                          item.children.map((child: any) => {
                            if (child.type !== undefined && child.type == 0) {
                              return (
                                <div className="exam-items clear">
                                  <div
                                    className="exam-title"
                                    onClick={() => goToSecond(child)}
                                  >
                                    {child.value}
                                  </div>
                                  <div className="exam-title2">
                                    {child.children && child.children.length > 0
                                      ? child.children.map((list: any) => {
                                          return (
                                            <a
                                              className="exam-item"
                                              onClick={() => goToItem(list)}
                                            >
                                              <span>{list.value}</span>
                                            </a>
                                          );
                                        })
                                      : null}
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="exam-items clear">
                                  <div className="exam-title">其他</div>
                                  <div className="exam-title2">
                                    <a
                                      className="exam-item"
                                      onClick={() => goToItem(child)}
                                    >
                                      <span>{child.value}</span>
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                          })
                        ) : null}
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="advertisement">
          <div className="advertisementImg"></div>
        </div>
        </div>

        {userStore.getToken() ? (
          <div className="login-already">
            <div className="already-title">
              {/* <div className="img"></div> */}
              <img src={userInfo.avatar} alt="avatar" />
              <div className="already-text">
                {/* <p className="text-name">{result.nickname}</p> */}
                <p className="text-name">{userInfo.nickname}</p>
                <p className="text-id">ID: {userInfo.uid}</p>
              </div>
            </div>
            <div className="already-text2">
              <div
                className="my-course"
                onClick={() => {
                  navigate("/personalCenter");
                }}
              >
                我的课程
              </div>
              <div>|</div>
              <div
                className="my-order"
                onClick={() => {
                  navigate("/personalCenter?topNavIndex=2");
                }}
              >
                我的订单
              </div>
            </div>
            <div className="already-tostudy">
              <div className="already-img"></div>
              <button
                onClick={() => {
                  navigate("/personalCenter");
                }}
              >
                去学习
              </button>
            </div>
          </div>
        ) : (
          <div className="login-welcome">
            <div className="welcome-title">
              <div className="img"></div>
              <div className="welcome-text">
                <p>亲爱的学员</p>
                <p>欢迎来到准题库</p>
              </div>
            </div>
            <div className="welcome-img"></div>
            <button onClick={handleToLogin}>登录/注册</button>
          </div>
        )}
      </div>
      <Modal
        title=""
        className="header-modal-wrap"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Login />
      </Modal>
    </div>
  );
}

export default observer(TopNav);
