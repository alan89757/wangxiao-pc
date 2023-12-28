import React, { useState, useEffect } from "react";
// import { StyleSheet, div, span } from 'react-native';
import "./css/RecursionLevelList.scss";
import RecursionLevelChildren from "./RecursionLevelChildren";
// import { p } from '@/components/p';
// import { fetchAuthorizeandSign } from '@/api/modules/course';
import { RoundedProgressBar } from "./RoundedProgressBar";
// import { navigationFn } from '@/pages/course/constructs/datas/index';
// import { useNavigation } from '@react-navigation/native';
// import { getGoodsDetails } from '@/api/modules/goods';
import { assembleData } from "../../utils/tree";
// import system from '@/store/system';

interface IChapterCourse {
  name: string;
  next: IChapterCourse[];
}

interface IPropType {
  list: IChapterCourse[]; // 产品树
  current?: number; // 当前类型
  callback?: Function; // 回调函数， 自定义跳转
  commodityId?: string; // 商品ID
  skuCode?: string; // sku规格
  isHideProgress?: boolean; // 是否隐藏学习进度
  defaultExpan?: boolean;
  statics?: any; // 统计数据
  styles?: object; // 自定义样式
  goSign?: any; //
}

export default function RecursionLevelList(props: IPropType) {
  //   const navigation = useNavigation<any>();
  const {
    list,
    current = 0,
    callback,
    commodityId = "",
    isHideProgress = false,
    defaultExpan,
    statics,
    styles = {},
    goSign,
  } = props;

  // 章节课第一行默认展开
  useEffect(() => {
    // console.log(123);
    if (defaultExpan && list?.length > 0) {
      justOpen(list[0]);
    }
  }, [list]);



  //   const defaultNavigate = async (item:any) => {
  //     const { type, id: unitId, name, productId = '', preview = false, skuId = '' } = item;
  //     const goodsData: any = await getGoodsDetails(commodityId);
  //     const { isPurchase = false } = statics.find((it:any) => it.id === item.id) || {};
  //     if (preview || isPurchase) {
  //       // 已购买或试用
  //       let code = '';
  //       // 考试无需获取code

  //       // code = await fetchLessonAuthorize({
  //       //   productId,
  //       //   unitId,
  //       //   certificateId: goodsData?.certificateId,
  //       // });
  //       const res = await fetchAuthorizeandSign({
  //         productId,
  //         unitId,
  //         certificateId: goodsData?.certificateId,
  //       });
  //       code = res.code;
  //       const { errCode, contractInfoList } = res;
  //       if (errCode === 2352) {
  //         goSign(contractInfoList);
  //         return;
  //       }
  //       if (type === 3) {
  //         // console.log('商品数据', goodsData);
  //         navigation.navigate('ExaminationRoom', { code, goodsData: goodsData, title: name });
  //         return;
  //       }
  //       const { path, params } = await navigationFn({
  //         type,
  //         code,
  //         productId,
  //         unitId,
  //         name,
  //         indexUrl: '',
  //       });
  //       navigation.navigate(path, { ...params, goodsData: goodsData });
  //     } else {
  //       // 章节课跳转到直接购买页面，不需要选择规格
  //       if (skuId) {
  //         // 找到当前的sku
  //         const result = goodsData?.skuList?.find((sku:any) => +sku.skuId === +skuId);
  //         let currentSkuObj = result ? result : {};
  //         navigation.navigate(goodsData?.type === 3 ? 'EntityPay' : 'CoursePay', {
  //           goodsData,
  //           list: [
  //             {
  //               ...currentSkuObj,
  //               number: 1,
  //             },
  //           ],
  //           activityId: goodsData?.activityId,
  //         });
  //       } else {
  //         navigation.navigate('AgreementPay', { goodsData });
  //       }
  //     }
  //   };
  //   let callbackFn = callback ? callback : defaultNavigate;
  const [preClickIdArr, setPreClickIdArr] = useState([]);
  const openClose = (item: any) => {
    const currentVal = item.name;
    let preClickIdArr2 = JSON.parse(JSON.stringify(preClickIdArr));
    if (preClickIdArr2.indexOf(currentVal) === -1) {
      preClickIdArr2.push(currentVal);
    } else {
      preClickIdArr2.splice(preClickIdArr2.indexOf(currentVal), 1);
    }
    setPreClickIdArr(preClickIdArr2);
  };
  // 只是打开
  const justOpen = (item: any) => {
    const currentVal = item.name;
    let preClickIdArr2 = JSON.parse(JSON.stringify(preClickIdArr));
    if (preClickIdArr2.indexOf(currentVal) === -1) {
      preClickIdArr2.push(currentVal);
    }
    setPreClickIdArr(preClickIdArr2);
  };

  const hasPreClickId = (arr: any, name: any) => {
    if (arr.indexOf(name) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const findPreview = (next: any) => {
    const find = (next: any) => {
      return next.find((item: any) => {
        if (item.next) {
          return find(item.next);
        }
        if (item.preview) {
          return true;
        }
      });
    };
    return !!find(next);
  };

  return (
    <div className="page1">
      <div className="group1">
        {list &&
          list.map((item: any, index) => {
            const { next } = item;
            // 查找是否有试学
            let isPreivew = findPreview(next);
            // 学习进度
            const { speedRate = 0, spnum = 0 } = assembleData(item, statics);

            return (
              <div key={item.name}>
                <div className="group2">
                  <div
                    onClick={() => {
                      openClose(item);
                    }}
                  >
                    {item.nodeType === "J" ? (
                      <div
                        className="group21"
                        style={{ marginTop: index > 0 ? 20 : 0 }}
                      >
                        <div className="group23">
                          <span className="text21"> </span>
                          <span className="text22">{item.name}</span>
                        </div>
                        {hasPreClickId(preClickIdArr, item.name) ? (
                          //   <p
                          //     name="chevron-up"
                          //     size={18}
                          //     color={"#333333"}
                          //     style={{ marginRight: 10 }}
                          //   />
                          <div
                            className="iconfont  icon-symbol_up"
                            style={{ marginRight: 20 }}
                          ></div>
                        ) : (
                          //   <p
                          //     name="chevron-down"
                          //     size={18}
                          //     color={"#333333"}
                          //     style={{ marginRight: 10 }}
                          //   />
                          <div
                            className="iconfont  icon-symbol_down"
                            style={{ marginRight: 20 }}
                          ></div>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          paddingTop: 16,
                          paddingRight: 10,
                          paddingLeft: 10,
                        }}
                      >
                        <div className={index == 0 ? "group3Top" : "group3"}>
                          {hasPreClickId(preClickIdArr, item.name) ? (
                            // <p name="expand_1_1" size={18} color={'#333333'} />
                            <div className="expand_1_1 iconfont icon-expand_1_1 "></div>
                          ) : (
                            // <p name="expand_1_2" size={18} color={'#333333'} />
                            <div className="expand_1_2 iconfont icon-expand_1_2"></div>
                          )}
                          <div className="text1Wrap">
                            <span className="text1">{item.name}</span>
                            {isPreivew ? (
                              <span className="text10">试学</span>
                            ) : null}
                          </div>
                        </div>
                        {!isHideProgress ? (
                          <div className="group4">
                            {speedRate ? (
                              <RoundedProgressBar
                                progress={speedRate}
                                width={40}
                                height={6}
                                color="#E51600"
                                borderRadius={4}
                              />
                            ) : null}
                            {speedRate ? (
                              <span className="text2">{speedRate * 100}%</span>
                            ) : null}
                            <span className="text3">{spnum}人关注</span>
                          </div>
                        ) : (
                          <div className="group4">
                            <span className="text3">{spnum}人关注</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {hasPreClickId(preClickIdArr, item.name) ? (
                  item.next && item.next.length > 0 ? (
                    <RecursionLevelChildren
                      list={item.next}
                      statics={statics}
                      current={current}
                      callback={callback}
                      productId={item.id}
                      isHideProgress={isHideProgress}
                    />
                  ) : (
                    <div className="group15" key={item.name}>
                      <div className="group16">
                        {/* <p name="search" size={26} /> */}
                        <span className="group18">课程内容正在制作中</span>
                      </div>
                    </div>
                  )
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}
