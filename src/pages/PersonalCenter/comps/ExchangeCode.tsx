import { useState, useRef } from "react";
import "../css/ExchangeCode.scss";
import { Input } from "antd";
import { exchangeCode, exchangeActivationCode } from "../../../apis/exchange";
import { Modal, Button } from "antd";
function ExchangeCode() {
  const [inputvalue, setInputvalue] = useState<any>();
  const inputRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 错误提示
  const [msg, setMsg] = useState("");
  const goExchange = async () => {
    const code = inputRef?.current?.input.value;
    if (!code) {
      return;
    }
    setIsModalOpen(true);
    let res = { code: 0 };
    let bussinessName = "兑换";
    if (String(code)[0] === "J" && String(code).length === 10) {
      // 激活码
      bussinessName = "激活";
      res = await exchangeActivationCode(code);
    } else {
      res = await exchangeCode({ redeemCode: code });
    }
    if (res.code === 2085) {
      setIsModalOpen(true);
      setMsg(`您输入的${bussinessName}码已激活`);
    }
    if (res.code === 2088) {
      setIsModalOpen(true);
      setMsg(`您输入的${bussinessName}码不正确`);
    }
    if (res.code === 1000) {
      setIsModalOpen(true);
      setMsg(`您输入的${bussinessName}码激活成功`);
    }
  };
  return (
    <div className="exchangecodeOutwrap">
      <div className="inputbox">
        {/* <input type="text" placeholder="请输入兑换码" className="code-input" /> */}
        <Input
          placeholder="请输入兑换码"
          className="code-input"
          value={inputvalue}
          ref={inputRef}
        />
        <div className="exchangebutton" onClick={goExchange}>
          激活
        </div>
      </div>
      <div className="instructions">
        <div className="tipTit">使用说明</div>
        <ul>
          <li className="tips">1.兑换成功后,可再兑换记录中查看;</li>
          <li className="tips">2.若兑换码不存在,请联系直播客服人员;</li>
          <li className="tips">3.输入兑换码,可激活对应的商品;</li>
          <li className="tips">
            4.若第三方购买的兑换码有疑问,请及时联系您的商家;
          </li>
        </ul>
      </div>
      <Modal
        title="温馨提示"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        closable={false}
        className="tipsModal"
        width={300}
        style={{ textAlign: "center" }}
        footer={null}
      >
        <p
          className="tip-p"
          style={{
            marginTop: "12px",
            marginBottom: "24px",
            fontSize: "16px",
            fontWeight: 400,
            color: "#323949",
          }}
        >
          您输入的兑换码已激活
        </p>
        <Button
          shape="round"
          size="large"
          block={true}
          style={{
            background: "#e51600",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "12px",
          }}
          className="okbutton"
          onClick={() => setIsModalOpen(false)}
        >
          确定
        </Button>
      </Modal>
    </div>
  );
}
export default ExchangeCode;
