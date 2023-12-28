import React, { useState, useEffect } from "react";
import "../css/PersonalMessage.scss";
import { fetchUserInfo } from "../../../apis/user";

function PersonalMessage() {
  // const [messageData, setMessageData] = useState({
  //   avatar: "../images/avatar.png",
  //   nickName: "蛋卷哥哥",
  //   workUnit: "湖南准题库教育科技有限公司",
  // });
  // 获取登录后的用户信息
  const [messageData, setMessageData] = useState({
    avatar: "",
    nickname: "",
    workUnit: "",
    org: ""
  });
  const getUserInfo = async () => {
    const result = await fetchUserInfo();
    console.log("个人中心getUserInfo--", result);
    setMessageData(result);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="personal-message-container">
      <div className="message-content">
        <div className="message-item">
          <div>头像</div>
          <img src={messageData.avatar || require("../images/avatar.png")} alt="avatar"/>
        </div>
        <div className="message-item">
          <div>昵称</div>
          <div>{messageData.nickname || "陈"}</div>
        </div>
        <div className="message-item">
          <div>工作单位</div>
          {messageData.org ? <div>{messageData.org}</div> : <div>无</div>}
        </div>
      </div>
    </div>
  );
}

export default PersonalMessage;
