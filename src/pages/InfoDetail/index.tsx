import { useLocation } from "react-router-dom";
import "./css/index.scss";
import BreadCrumb from "../../components/BreadCrumb";
import { getInfoDetail } from "../../apis/information";
import { useEffect, useState } from "react";
function InfoDetail() {
  const {
    state: { id },
  } = useLocation();
  const [content, setContent] = useState<any>();
  useEffect(() => {
    const getContent = async () => {
      const res = await getInfoDetail(id);
      setContent(res.content);
    };
    getContent();

    // setContent(res.content)
  });

  return (
    <div className="bg-content">
      <BreadCrumb />
      <div className="iframebox" dangerouslySetInnerHTML={{ __html: content }}>
        {/* <iframe
          src={infoUrl}
          width={1200}
          className="inframcontent"
          id="info_iframe"
        /> */}
      </div>
    </div>
  );
}
export default InfoDetail;
