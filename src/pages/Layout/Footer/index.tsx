import "./css/footerbanner.scss";
function Footerbanner() {
  return (
    <div className="footer-banner">
      <div className="footer-top">
        <img src="https://app.static.wangxiao.cn/pc/images/footer.png" alt="" />
      </div>
      <div className="footer-bottom">
        <span className="hr"></span>
        <div className="footer-bottom-first">
          <span className="footer-text">
            Copyright © 2003 - 2022 www.wangxiao.cn All Rights Reserved.
            中大英才（北京）网络教育科技有限公司 版权所有
          </span>
        </div>
        <div className="footer-bottom-second">
          <span className="footer-text">
            出版物经营许可证:新出发京字第丰180113号 京B2- 20201340
            京ICP备10212420号-1 京公安备11010602000551号 营业执照
          </span>
        </div>
      </div>
    </div>
  );
}
export default Footerbanner;
