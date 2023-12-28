import React,{ useState, useEffect } from "react";
import { message } from "antd";
import { getCouponList, receiveCoupon } from "../../../apis/courseDetail";
import "../css/CourseInfo.scss";
import userStore from "../../../store/user";
import QrcodeModal from "../../../components/QrcodeModal";

function CourseInfo(props: any) {
  const { courseData } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [activeCode, setActiveCode] = useState<any[]>([]); // 选中的SKUcode
  // x
  const [activeSku, setActiveSku] = useState<SKuType>();
  const [skuOptions, setSkuOptions] = useState<any[]>([]);
  const [couponList, setCouponList] = useState<any[]>([]); //优惠卷列表
  const [courseImgList, setCourseImgList] = useState([]); // 商品缩略图
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isSeckill, setIsSeckill] = useState(false); // 是否秒杀
  const [remain, setRemain] = useState(0);
  const [commodityId, setCommodityId] = useState(""); //暂存商品id
  const [isModalOpen, setIsModalOpen] = useState(false); // 学习弹框
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // 设置二维码的url
  const [timeData, setTimeData] = useState({
    hour: 0,
    min: 0,
    second: 0,
  });
  const handleImgPrev = () => {
    if (currentImgIndex != 0) {
      setCurrentImgIndex(currentImgIndex - 1);
    }
  };
  const handleImgNext = () => {
    if (currentImgIndex != courseImgList.length - 1) {
      setCurrentImgIndex(currentImgIndex + 1);
    }
  };
  interface SKuType {
    /**
     * 是否允许积分兑换：0-否，1-是
     */
    allowIntegral: number;
    /**
     * 积分价格
     */
    integralPrice: number;
    /**
     * 规格划线价格
     */
    linePrice: number;
    /**
     * 规格价格
     */
    price: number;
    /**
     * 规格标识
     */
    skuCode: string;
    /**
     * 规格id
     */
    skuId: string;
    /**
     * sku名称列表
     */
    skuName: string;
    /**
     * 库存
     */
    stock: number;
    /**
     * 使用期限
     */
    timeLimit: number;
    /**
     * 期限类型（默认：1-月）
     */
    timeType: number;
    /**
     * 限量
     */
    quantity?: number;
    /**
     * 剩余数量
     */
    overplus?: number;

    amount: number;
    number: number;
  }
  useEffect(() => {
    if (courseData?.id) {
      setCommodityId(courseData.id);
      // 需判断是否登录
      let token = userStore.getToken();
      if (token) {
        getCoupon(courseData.id);
      }
    }
  }, [courseData?.id]);
  useEffect(() => {
    if (!courseData?.skuOptions) {
      return;
    }
    setSkuOptions(courseData?.skuOptions as any);
    const level = courseData.skuOptions.length || 0;
    const arr: any[] = [];
    for (let i = 0; i < level; i++) {
      arr.push(i < level - 1 ? 0 : "");
    }

    if (level) {
      setActiveCode(arr);
    }
    // 只有单SKU的话默认选中
    if (courseData?.skuList?.length !== 1) {
      arr[level - 1] = 0;
      setActiveCode(arr);
      setActiveSku(courseData?.skuList?.[0]);
    }
    if (courseData?.skuList?.length == 1) {
      arr[level - 1] = 0;
      setActiveCode(arr);
      setActiveSku(courseData?.skuList?.[0]);
    }
  }, [courseData?.skuOptions]);
  useEffect(() => {
    if (!courseData?.images) {
      return;
    }
    setCourseImgList(courseData.images);
  }, [courseData?.images]);

  useEffect(() => {
    if (courseData?.activityType == 3) {
      setIsSeckill(true);
    } else {
      setIsSeckill(false);
    }
  }, [courseData?.activityType]);
  useEffect(() => {
    if (courseData?.inDate) {
      setRemain(courseData.inDate);
    }
  }, [courseData?.inDate]);
  useEffect(() => {
    if (remain) {
      reset();
    }
  }, [remain]);
  const skuClick = (level: number, val: number) => {
    const arr = [...activeCode];
    const res = arr.map((item, index) => {
      return index < level ? item || 0 : index === level ? val : "";
    });
    setActiveCode(res);
    setActiveSku(undefined);
  };
  const leafSkuClick = (idx: number, sellOut: boolean, skuNmae: string) => {
    if (sellOut) {
      return;
    }
    const arr = [...activeCode];
    arr[activeCode.length - 1] = idx;
    const sku = courseData?.skuList?.find(
      (item: any) => item.skuCode === arr.join(":")
    );
    if (sku) {
      sku.skuName = skuNmae;
    }

    setActiveSku(sku);
    setActiveCode(arr);
  };
  // 时间补全 0
  const checkTime = (i: any) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };
  const updateTimeData = (t: any) => {
    let hour = Math.floor(t / 1000 / 60 / 60);
    let minute = Math.floor((t / 1000 / 60) % 60);
    let second = Math.floor((t / 1000) % 60);
    let msecond = Math.floor(t % 1000);
    setTimeData({
      hour: checkTime(hour),
      min: checkTime(minute),
      second: checkTime(second),
    });
  };

  let timer: any = null;
  // 开启倒计时
  const startTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    if (remain < 1000) {
      return;
    }
    let timeDown = remain;
    timer = setInterval(() => {
      timeDown -= 1000;
      updateTimeData(timeDown);
      if (timeDown < 1000) {
        clearInterval(timer);
      }
    }, 1000);
  };

  // 重置倒计时
  const reset = () => {
    updateTimeData(remain);
    start();
  };

  // 暂停倒计时
  const pause = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  // 开始倒计时
  const start = () => {
    if (timer) {
      return;
    }
    startTimer();
  };
  const getCoupon = async (commodityId: string) => {
    const res = await getCouponList(commodityId);
    setCouponList(res);
  };
  // 领取优惠劵
  const receCoupon = async (item: any) => {
    if (item.receive) {
      return;
    }
    const res = await receiveCoupon(item.id);
    if (res) {
      success();
      getCoupon(commodityId);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "领取优惠卷成功",
    });
  };

  // 处理二维码弹框
  const handleCloseQrCode = ()=> {
    setIsModalOpen(false);
  }
  // 去手机学习
  const handleBuy = () => {
    setQrCodeUrl(`${window.location.origin}/siteH5/#/page_commodity/commodity/pages/commodityBank?id=${courseData.id}`)
    setIsModalOpen(true);
  };
  return (
    <div className="courseinfoOutwrap">
      <div className="course-info clear">
        <div className="course-lf fl">
          <img
            src={courseImgList[currentImgIndex]}
            alt=""
            className="course-video"
          />
          <div className="course-img-pick">
            <div
              className="pick-img-left iconfont icon-symbol_left "
              onClick={handleImgPrev}
            ></div>
            <div className="pick-img-content">
              {courseImgList.map((item, index) => {
                return (
                  <img
                    className={
                      index == currentImgIndex
                        ? "pick-img-one-active"
                        : "pick-img-one"
                    }
                    src={item}
                    key={index}
                    onClick={() => setCurrentImgIndex(index)}
                  />
                );
              })}
            </div>
            <div
              className="pick-img-right iconfont icon-symbol_right "
              onClick={handleImgNext}
            >
              {/* 》 */}
            </div>
          </div>
          <div className="bubbleDiv">
            <div className="top-title"></div>
          </div>
        </div>
        <div className="course-right fl">
          <p className="title">{courseData?.name}</p>

          <div className="course-about">
            <p className="fl">
              <span className="iconfont iconbiaoqian"></span>
              <span className="txt">{courseData?.sellingPoint}</span>
            </p>
          </div>
          <div>
            {isSeckill ? (
              <div
                className={
                  couponList.length > 0
                    ? "course-info-item clear limited-time-group"
                    : "course-info-item clear limited-time-group-no-coupon"
                }
              >
                <div className="fr time-box">
                  <div className="time">{timeData.hour}</div>
                  <div className="time-icon">:</div>
                  <div className="time">{timeData.min}</div>
                  <div className="time-icon">:</div>
                  <div className="time">{timeData.second}</div>
                </div>
              </div>
            ) : null}
          </div>
          {couponList.length > 0 ? (
            <div
              className={
                isSeckill
                  ? "course-info-item clear price-group price-group-top"
                  : "course-info-item clear price-group"
              }
            >
              {couponList.map((item, index) => {
                return (
                  <div
                    className={
                      index == 0 ? "coupon-one" : "coupon-one coupon-one-top"
                    }
                    key={index}
                  >
                    <div className="coupon-one-type">
                      {item.type == 0 ? "满减券" : "折扣券"}
                    </div>
                    <div className="coupon-one-title">{item.name}</div>
                    <div
                      className={
                        item.receive
                          ? "coupon-one-btn coupon-one-btn-disabled"
                          : "coupon-one-btn"
                      }
                      onClick={() => receCoupon(item)}
                    >
                      {item.receive ? "已领取" : "立即领取"}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          <div className="subject-group">
            {courseData?.skuOptions?.length > 0 &&
              courseData?.skuOptions.map((item: any, skuIndex: number) => {
                return (
                  <div
                    className="course-info-item clear sku-level"
                    key={skuIndex}
                  >
                    <div className="item-lf">
                      <div className="sku-name">{item.name}</div>
                      <div className="btn-list">
                        {item?.values.map((child: any, index: number) => {
                          // 是否叶子节点
                          const isLeaf = skuIndex === skuOptions.length - 1;
                          // 是否选中
                          const isActive = activeCode[skuIndex] === index;
                          let leaf: any = null;
                          let sellOut = false;
                          // 根节点的展示
                          if (isLeaf) {
                            const arr = [...activeCode];
                            arr.pop();
                            arr.push(index);
                            leaf = courseData?.skuList?.find((i: any) => {
                              return i.skuCode === arr.join(":");
                            });

                            // sellOut = (leaf?.stock ?? 1) <= 0;
                          }
                          if (isSeckill) {
                            return (
                              <span
                                className={
                                  isActive
                                    ? "p-span active miaosha "
                                    : "p-span miaosha"
                                }
                                onClick={() => {
                                  if (isLeaf) {
                                    leafSkuClick(index, sellOut, item);
                                  } else {
                                    skuClick(skuIndex, index);
                                  }
                                }}
                                key={index}
                              >
                                {child}
                              </span>
                            );
                          } else {
                            return (
                              <span
                                className={
                                  isActive ? "p-span active" : "p-span"
                                }
                                onClick={() => {
                                  if (isLeaf) {
                                    leafSkuClick(index, sellOut, item);
                                  } else {
                                    skuClick(skuIndex, index);
                                  }
                                }}
                                key={index}
                              >
                                {child}
                              </span>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {contextHolder}
      </div>
      <div className="price-box">
        <div className="price-box-left">
          <div className="price-real">
            <span className="price-icon">￥</span>
            {activeSku ? activeSku?.price : "XX"}
          </div>
          <div className="price-old">
            ￥{activeSku ? activeSku?.linePrice : "XX"}
          </div>
        </div>
        <div className="price-box-right">
          <div className="interest-box">
            <span style={{ color: "#FE4E47" }}>{courseData?.salesVolume}</span>
            人已关注
          </div>
          <div className="buy-btn" onClick={handleBuy}>
            手机购买
          </div>
        </div>
      </div>
      <QrcodeModal
        isShow={isModalOpen}
        type={"purchase"}
        onCloseQrCode={handleCloseQrCode}
        qrCodeUrl={qrCodeUrl}
      />
    </div>
  );
}

export default CourseInfo;
