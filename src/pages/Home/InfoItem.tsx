import { useNavigate } from "react-router-dom";
import { handleBread } from "../../utils/bread";
import "./css/infoItem.scss";

function InfoItem(props: any) {
  const { coverPic, publishTime, readingAmount, title, summary, id } =
    props.item;
  const navigate = useNavigate();
  const goInfoDetail = (id: any) => {
    handleBread({ title: "资讯详情", href: "/infoDetail" });
    navigate("/infoDetail", { state: { id: id } });
  };
  return (
    <div onClick={() => goInfoDetail(id)} className="infoItem">
      <div className="leftImg">
        <img src={coverPic} alt="" className="coverImg" />
      </div>
      <div className="rightContent">
        <div className="top-info">
          <span className="title">{title}</span>
          <span className="publishTime readingAmount">
            <span className="iconfont icon-a-studentID icon-style"></span>
            {readingAmount}
          </span>
          <span className="publishTime">{publishTime}</span>
        </div>
        <div className="details">{summary}</div>
      </div>
    </div>
  );
}

export default InfoItem;
