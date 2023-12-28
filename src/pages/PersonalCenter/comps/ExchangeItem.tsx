import { useState } from "react";
import "../css/ExchangeItem.scss";
import QrcodeModal from "../../../components/QrcodeModal";

function ExchangeItem(params: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const goStudy = () => {
    setIsModalOpen(true);
  };
  const handleCloseQrCode = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="recordContent">
      <div className="leftinfo">
        <div className="course-name"> {params.activityName}</div>
        <div className="exchange-time"> {params.createTime}</div>
      </div>
      <div className="rightinfo">
        <div className="goStudy" onClick={goStudy}>
          手机学习
        </div>
      </div>
      <QrcodeModal
        isShow={isModalOpen}
        type={"study"}
        onCloseQrCode={handleCloseQrCode}
        qrCodeUrl={`${window.location.origin}/siteH5/#/pages/newCourse/index?current=1`}
      />
    </div>
  );
}
export default ExchangeItem;
