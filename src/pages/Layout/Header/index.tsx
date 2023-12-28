import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Select, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import type { SelectProps, MenuProps } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import userStore from "../../../store/user";
import { searchCourseList } from "../../../apis/course";
import Login from "../../../components/Login"; // 登录
import QrcodeModal from "../../../components/QrcodeModal"; // 登录
import "./css/header.scss";

function Header(props: any) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false); // 手机H5学习或购买弹框
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [searchValue, setSearchValue] = useState<string>(props.search || "");

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 点击跳转到首页
  function handleToHome() {
    navigate("/");
  }
  // 点击弹出手机学习的引导二维码
  function handlePhoneLearn() {
    setQrCodeModalOpen(true);
  }
  // 点击后打开登录弹窗
  function handelToLogin() {
    setIsModalOpen(true);
  }

  // 获取课程搜索结果
  const getSearchCourseResult = async (params: any) => {
    const courseInfo = await searchCourseList({
      commodityName: params.name,
      type: 1,
      status: 0,
      index: 0,
      row: 10,
    });
    setData(courseInfo || []);
  };
  const userInfo = userStore.getUserInfo();

  // 是
  const handleSearch = (newValue: string) => {
    if (newValue) {
      setSearchValue(newValue);
    }
    getSearchCourseResult({
      name: newValue,
    });
  };

  // 点击-跳到课程查询列表
  const searchCourse = async () => {
    if (searchValue) {
      navigate(`/allCourse/search/${searchValue}`);
    }
  };

  // 搜索跳到课程查询列表
  const handleChange = (newValue: string) => {
    navigate(`/allCourse/search/${newValue}`);
  };

  // 退出
  const logout = () => {
    userStore.setToken("");
    userStore.setUserInfo({});
    navigate("/");
    window.location.reload();
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span
          rel="noopener noreferrer"
          onClick={() => handleNavigate("/personalCenter?topNavIndex=3")}
        >
          个人资料
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          rel="noopener noreferrer"
          onClick={() => {
            handleNavigate("/personalCenter?topNavIndex=2");
          }}
        >
          我的订单
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={logout} rel="noopener noreferrer" href="javascript:void(0)">
          退出登录
        </a>
      ),
    },
  ].filter((item, index) => {
    if (
      window.location.hash.indexOf("personalCenter") > -1 &&
      [1, 2].includes(+item?.key)
    ) {
      // 个人中心不要展示个人资料和我的订单
      return false;
    } else {
      return true;
    }
  });

  // 关闭弹框
  const handleCloseQrCode = (val: boolean) => {
    setQrCodeModalOpen(val);
  };

  return (
    <div className="header-outwrap">
      <div className="header-content">
        <div className="search-wrap fl header-search">
          <div className="header-logo"></div>
          <div className="header-text" onClick={handleToHome}>
            首页
          </div>
          <Select
            showSearch
            className="header-input"
            placeholder={"搜索课程"}
            value={searchValue}
            // style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
              value: d.name,
              label: d.name,
            }))}
          />
          <div className="search-btn search-search-wrap" onClick={searchCourse}>
            <span className="iconfont icon-search"></span>
          </div>
          <ul className="search-history"></ul>
        </div>
        <div className="header-right fr">
          <div className="header-phone" onClick={handlePhoneLearn}>
            <span className="iconfont icon-phone"></span>
            <div className="phone-text1">用手机学</div>
          </div>
          {userStore.getToken() ? (
            <div className="header-adylogin">
              <div className="header-user">
                <img
                  src={userInfo.avatar}
                  alt="avatar"
                  className="user-avatar"
                />
                <div className="user-name">{userInfo.nickname}</div>
              </div>
              {/* <div className="down-icon iconfont icon-symbol_down"></div> */}
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : (
            <div className="header-login" onClick={handelToLogin}>
              <div className="login-item">
                <span className="iconfont icon-user"></span>
                <div className="login-btn">登录</div>
              </div>
              <div>|</div>
              <div className="register-btn">注册</div>
            </div>
          )}
        </div>
      </div>
      <div className="borslin">
        <a href="javascript:void(0)" target="_blank" className="navs-item"></a>
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
      <QrcodeModal
        isShow={qrCodeModalOpen}
        type={"study"}
        onCloseQrCode={handleCloseQrCode}
        qrCodeUrl={`${window.location.origin}/siteH5/#/`}
      />
    </div>
  );
}

export default observer(Header);
