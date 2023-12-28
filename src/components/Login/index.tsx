/* eslint-disable  */
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { getCDNUrl } from "../../config/index";
import {
  loginPassword,
  fetchUserInfo,
  getVerifyCode,
  verifyCodeLogin,
  fetchChannelId,
} from "../../apis/user";
import userStore from "../../store/user";

import "./css/loginAlert.scss";
import "./css/loginCommon.scss";
import "./css/index.scss";

function Login() {
  const formRef = useRef<any>(null);
  const countRef = useRef<any>(null);
  const ref = useRef<any>({ count: 60, timer: null });
  const [count, setCount] = useState<any>(null);
  const [isCounting, setIsCounting] = useState(false);
  const [currentTab, setCurrentTab] = useState(1); // 1 验证码登录  2 密码登录
  const [channelId, setChannelId] = useState(''); // 获取渠道id
  const [flag, setFlag] = useState(false);
  // const [, setCount] = useState(0);
  const [phone, setPhone] = useState<number>(); // 手机号码
  const [verifyCode, setVerifyCode] = useState<string>(""); // 手机号码
  const [sessionKey, setSessionKey] = useState(""); // 验证码登录返回的临时会话id

  // 开始倒计时
  const startCountdown = () => {
    setIsCounting(true);
    setCount(60); // 设置初始倒计时时间
  };
  // 停止倒计时
  const stopCountdown = () => {
    setCount(null);
    setIsCounting(false);
  };

  const getChannelId = async () => {
    const channelId = await fetchChannelId();
    setChannelId(channelId);
  };

  useEffect(() => {
    // 获取协议信息
    getChannelId();
  }, []);

  useEffect(() => {
    if (!countRef.current && count) {
      countRef.current = setInterval(() => {
        if (count && count > 0) {
          setCount((count: any) => count - 1);
        } else {
          stopCountdown();
        }
      }, 1000);
    }
  }, [isCounting]);

  // 处理验证码登录
  const handleVerifyCodeLogin = (sessionKey: string, code: string) => {
    const formInstance = formRef.current;
    // 获取表单字段的值
    const formValues = formInstance.getFieldsValue();
    // 进行表单校验
    formInstance
      .validateFields()
      .then(async () => {
        verifyCodeLogin(
          {
            sessionKey,
            code,
          },
          {
            deviceId: "pc",
            deviceModel: "pc",
            deviceName: "pc",
          }
        ).then(async ({ accessToken = "" }) => {
          //登录成功则跳转
          if (accessToken) {
            userStore.setToken(accessToken); // 存储token
            const userinfo = await fetchUserInfo();
            userStore.setUserInfo(userinfo); // 存储用户信息
            window.location.reload();
            // systemStore.hideLoading();
            // storage.set('token', res.accessToken, 'login');
            // navigation.navigate('Home');
          }
        });
      })
      .catch((err: any) => {
        console.log("Validation failed:", err);
      });
  };
  // 处理密码登录
  const handlePasswordLogin = () => {
    const formInstance = formRef.current;
    // 获取表单字段的值
    const formValues = formInstance.getFieldsValue();
    // 进行表单校验
    formInstance
      .validateFields()
      .then(async () => {
        const { accessToken = "" } = await loginPassword(formValues);
        userStore.setToken(accessToken); // 存储token
        const userinfo = await fetchUserInfo();
        userStore.setUserInfo(userinfo); // 存储用户信息
        window.location.reload();
      })
      .catch((err: any) => {
        console.log("Validation failed:", err);
      });
  };

  const handleLogin = () => {
    if (currentTab === 1) {
      handleVerifyCodeLogin(sessionKey, verifyCode);
    } else if (currentTab === 2) {
      // 密码登录
      handlePasswordLogin();
    }
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // 60s之内不能重复获取验证码，60s倒计时
  const digui = useCallback(() => {
    ref.current.timer = setTimeout(() => {
      ref.current.count = ref.current.count - 1;
      setCount(ref.current.count - 1);
      if (ref.current.count > 0) {
        digui();
      } else {
        setFlag(true);
      }
    }, 1000);
  }, []);

  // 获取验证码
  const getCodes = useCallback(() => {
    const formInstance = formRef.current;
    // 获取表单字段的值
    const formValues = formInstance.getFieldsValue();
    // 进行表单校验
    formInstance
      .validateFields(["mobile"])
      .then(async () => {
        startCountdown();
        getVerifyCode({ mobile: formValues.mobile }).then((res) => {
          if (res.sessionKey) {
            setSessionKey(res.sessionKey);
          } else {
            // 执行失败回调
            message.error("获取验证码失败");
          }
        });
      })
      .catch((err: any) => {
        console.log("Validation failed:", err);
      });
  }, [phone]);

  type FieldType = {
    mobile?: string;
    password?: string;
    verifyCode?: string;
    remember?: string;
  };
  return (
    <div className="login-content">
      <div className="content-box">
        <div className="cright">
          <div id="tab-click">
            <div className="tab loginTab" onClick={() => setCurrentTab(1)}>
              <div className={currentTab === 1 ? "text active" : "text"}>
                验证码登录
              </div>
              <div className={currentTab === 1 ? "tabActive" : ""}></div>
            </div>
            <div className="tab loginTab" onClick={() => setCurrentTab(2)}>
              <div className={currentTab === 2 ? "text active" : "text"}>
                密码登录
              </div>
              <div className={currentTab === 2 ? "tabActive" : ""}></div>
            </div>
            <div className="clear"></div>
          </div>
          <div id="normal-login" className="boxs">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              ref={formRef}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="tel">
                <Form.Item<FieldType>
                  name="mobile"
                  rules={[
                    { required: true, message: "手机号不能为空" },
                    {
                      pattern:
                        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                      message: "请输入正确手机号！",
                    },
                  ]}
                >
                  <Input
                    className={"zdwx-username"}
                    placeholder="手机号"
                    value={phone}
                    onChange={(e) => setPhone(+e.target.value)}
                  />
                </Form.Item>
              </div>
              {currentTab === 2 ? (
                <div className="password">
                  <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: "请输入密码！" }]}
                  >
                    <Input.Password
                      className={"zdwx-password"}
                      placeholder="密码"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
              ) : (
                <div className="password">
                  <Form.Item<FieldType>
                    name="verifyCode"
                    rules={[{ required: true, message: "短信验证码不能为空" }]}
                  >
                    <div className="captcha-wrap">
                      <Input
                        className={"text-captcha"}
                        placeholder="短信验证码"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                      />
                      {count !== null && count > 0 ? (
                        <Button className="verify-code-btn" disabled>
                          {count}s
                        </Button>
                      ) : (
                        <Button onClick={getCodes} className="verify-code-btn">
                          获取验证码
                        </Button>
                      )}
                    </div>
                  </Form.Item>
                </div>
              )}

              <div id="login-normal" className="go-login" onClick={handleLogin}>
                登录
              </div>
              {currentTab === 2 ? (
                <p className="tshi"></p>
              ) : (
                <p className="tshi">
                  <i>*</i>
                  <span>若未注册，将为您自动注册</span>
                </p>
              )}
            </Form>
          </div>
          {/* <div id="wx-con" className="con-div boxs"></div> */}
          <div className="protocol">
            <span>提示：登录即代表同意</span>
            <a href={`${getCDNUrl()}/protocol/${channelId}/privacyAgreement.html`} target="_blank">
              《准题库隐私政策》
            </a>
            <span>和</span>
            <a href={`${getCDNUrl()}/protocol/${channelId}/registerProtocol.html`} target="_blank">
              《准题库注册协议》
            </a>
          </div>
          <div id="wx-login" className="wx-login"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
