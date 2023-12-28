import ExchangeItem from "./ExchangeItem";
import "../css/ExchangeCode.scss";
import { getGoodsRechargeList } from "../../../apis/exchange";
import { useEffect, useState } from "react";
import "../images/empty.png";
function ExchangeRecord() {
  const [exchangeList, setExchangeList] = useState([]);
  useEffect(() => {
    const getExchangeList = async () => {
      const res = await getGoodsRechargeList({ index: 0, row: 10 });
      setExchangeList(res);
    };
    getExchangeList();
  }, []);

  return (
    <div className="exchangecodeOutwrap recordBox">
      {exchangeList.length != 0 ? (
        exchangeList.map((item: any) => {
          return <ExchangeItem {...item} />;
        })
      ) : (
        <div className="emptyBox">
          <div className="emptyImg"></div>
        </div>
      )}
    </div>
  );
}
export default ExchangeRecord;
