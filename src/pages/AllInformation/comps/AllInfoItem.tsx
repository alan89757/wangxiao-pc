import { useNavigate } from "react-router-dom";
import BreadStore from "../../../store/breadCrumb";
import { handleBread } from "../../../utils/bread";
import "../css/allInfoItem.scss";

function AllInfoItem(props: any) {
  const navigate = useNavigate();
  const { id, coverPic, publishTime, readingAmount, title, summary } =
    props.item;
  const goInfoDetail = async (id: any) => {
    handleBread({
      title: "资讯详情",
      href: "/infoDetail",
    });
    navigate("/infoDetail", { state: { id: id } });
  };
  return (
    <div onClick={() => goInfoDetail(id)} className="allinfoItem">
      <div className="leftImg">
        <img src={coverPic} alt="" className="coverImg" />
      </div>
      <div className="rightContent">
        <div className="title">{title}</div>
        <div className="details">{summary}</div>
        <div className="times">
          <div className="publishTime">{publishTime}</div>
          <div className="publishTime readingAmount">
            <span className="iconfont icon-a-studentID"></span>
            {readingAmount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllInfoItem;
