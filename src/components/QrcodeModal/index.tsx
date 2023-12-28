import React, { useEffect, useState } from "react";
import { Modal, QRCode } from "antd";
import "./css/index.scss";

interface Iprops {
  isShow: boolean; // 是否展示弹框
  type: string; // study-学习 | purchase-购买
  qrCodeUrl: string; // 跳转地址
  onCloseQrCode: Function; // 关闭弹框回调
}

const QrcodeModal = (props: Iprops) => {
  const { type, onCloseQrCode, qrCodeUrl } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(props.isShow);
  }, [props.isShow]);

  const handleCancel = () => {
    onCloseQrCode(false);
  };

  return (
    <Modal
      title=""
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      wrapClassName={"qrcode-pop-wrap"}
      width={680}
    >
      <div className="qrcode-content-wrap">
        {type === "purchase" ? (
          <img
            src="https://app.static.wangxiao.cn/pc/images/buy.png"
            alt=""
            style={{ width: "100%" }}
          />
        ) : (
          <img
            src="https://app.static.wangxiao.cn/pc/images/study.png"
            alt=""
            style={{ width: "100%" }}
          />
        )}

        <QRCode
          className="qr-image"
          value={qrCodeUrl}
        />
      </div>
    </Modal>
  );
};

export default QrcodeModal;
