import React, { useState } from "react";
import { RoundedProgressBar } from "./RoundedProgressBar";
import "./css/RecurisonLevelChildRen.scss";
interface IChapterCourse {
  name: string;
  next: IChapterCourse[];
}
interface IPropType {
  list: IChapterCourse[]; // 列表
  current?: number; // 当前类型，视频/直播/考试/题库
  callback?: Function; // 回调函数，点击单条数据调用，可自行处理跳转
  productId?: string; // 产品id
  isHideProgress?: boolean; // 是否隐藏学习进度
  statics: any; // 统计数据
}

export default function RecursionLevelChildren(props: IPropType) {
  const {
    list = [],
    current = 0,
    callback,
    productId = "",
    isHideProgress = false,
    statics = [],
  } = props;
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
  const hasPreClickId = (arr: any, name: any) => {
    if (arr.indexOf(name) > -1) {
      return true;
    } else {
      return false;
    }
  };

  // 类型 0资料,1视频 ,2 题库 ,4直播
  const renderIcon = (type: any) => {
    switch (type.type) {
      case 0:
        return <div className="icon-practice-1"></div>;
      case 1:
        return <div className="icon-videocast-1"></div>;
      // return <IconVideocast size={18} />;
      case 2:
        return <div className="icon-details-1"></div>;
      case 3:
        return <div className="icon-exams-1"></div>;
      // return <IconExams size={18} />;
      case 4:
        return <div className="icon-live-1"></div>;
      // return <IconLive size={18} />;
    }
    return null;
  };

  // 按钮文案
  // 类型 0资料,1视频 ,2 题库 3 考试 ,4直播
  const renderText = (type: any) => {
    return "手机学习";
    switch (type.type) {
      case 0:
        return "查看";
      case 1:
        return "播放";
      case 2:
        return "练习";
      case 3:
        return "考试";
      case 4:
        return "播放";
    }
    return "学习";
  };

  // 资料/题库
  const RenderPracticeExamProgress = (item: any) => {
    const {
      speedRate = 0,
      done,
      total,
      spnum = 0,
      isUnit,
      preview,
      isPurchase,
    } = item;
    return (
      <>
        {speedRate ? (
          <div style={{ position: "relative", top: 1.5 }}>
            <RoundedProgressBar
              progress={speedRate}
              width={40}
              height={6}
              color="#E51600"
              borderRadius={4}
            />
          </div>
        ) : null}
        {done ? (
          <span className="text5-child">
            {done || 0}/{total || 0}道
          </span>
        ) : null}

        <span className="text6-child">{spnum}人关注</span>

        {isUnit ? (
          preview || isPurchase ? (
            <div className="group12-child">
              <div
                className="text9-child btn-pointer"
                onClick={() => callback && callback()}
              >
                {renderText(item)}
              </div>
            </div>
          ) : (
            <div className="group13-child btn-pointer">
              <div
                className="iconfont icon-lock_1  lock-icon-style"
                onClick={() => callback && callback()}
              ></div>
              {/* <BaseIcon name="lock" size={18} style={currentStyles.baseIcon} /> */}
            </div>
          )
        ) : null}
      </>
    );
  };

  // 视频
  const RenderVideoProgress = (item: any) => {
    const { speedRate = 0, spnum = 0, isUnit, preview, isPurchase } = item;
    return (
      <>
        {speedRate ? (
          <>
            <RoundedProgressBar
              progress={speedRate}
              width={40}
              height={6}
              color="#E51600"
              borderRadius={4}
            />
            <span className="text5">{speedRate * 100}%</span>
          </>
        ) : null}
        <span className="text6">{spnum}人关注</span>

        {isUnit ? (
          preview || isPurchase ? (
            <div className="group12-child btn-pointer">
              <span
                className="text9-child"
                onClick={() => callback && callback()}
              >
                {renderText(item)}
              </span>
            </div>
          ) : (
            <div className="group13-child btn-pointer">
              {/* <BaseIcon name="lock" size={18} style={currentStyles.baseIcon} /> */}
              <div
                className="iconfont icon-lock_1   lock-icon-style "
                onClick={() => callback && callback()}
              ></div>
            </div>
          )
        ) : null}
      </>
    );
  };
  // 产品树重新组装统计数据
  function assembleData(item: any, statics: any) {
    const current = statics?.find((it: any) => {
      // J-科目类型 P-产品类型 C-章类型 S-节类型 CU-学习单元类型(章) SU-学习单元类型(节)
      // console.log(item.id === it.id && it.nodeType === item.nodeType)
      // nodeType=== CU 和SU   nodetype和id匹配
      // nodeType=== S  nodeType和parentName和name匹配
      // nodeType=== C  nodeType和productId和name匹配
      // nodeType=== p  nodeType和parentId存在，parentId和id一起匹配，不存在直接用id匹配
      switch (item.nodeType) {
        case "CU":
        case "SU":
          if (item.id === it.id && item.nodeType === it.nodeType) {
            return true;
          }
          break;
        case "S":
          if (
            item.name === it.name &&
            item.nodeType === it.nodeType &&
            item.parentName === it.parentName
          ) {
            return true;
          }
          break;
        case "C":
          if (
            item.name === it.name &&
            item.nodeType === it.nodeType &&
            item.parentId === it.parentId
          ) {
            return true;
          }
          break;
        case "P":
          if (item.id === it.id && item.nodeType === it.nodeType) {
            return true;
          }
          break;
        default:
          return false;
      }
    });
    if (current) {
      return {
        ...item,
        ...current,
      };
    } else {
      return item;
    }
  }
  // 直播
  const RenderLiveProgress = (item: any) => {
    return (
      <>
        <span
          className={
            item.status === 0
              ? "living-child"
              : item.status === 1
              ? "living-child"
              : "textTip-child"
          }
        >
          {item.status === 0
            ? "待直播"
            : item.status === 1
            ? "直播中"
            : item.status === 2
            ? "已结束"
            : "已关闭"}
        </span>
        <span className="livetime-child">
          {item.status === 0
            ? `${item.liveStartTime}直播`
            : item.status === 1
            ? `${item.liveStartTime}直播`
            : item.status === 2
            ? `${item.duration}分钟`
            : null}
        </span>
      </>
    );
  };

  // 渲染列表进度 类型 0资料,1视频 ,2 题库 3 考试,4直播
  const RenderProgress = (item: any) => {
    switch (item.type) {
      case 0:
        return <RenderPracticeExamProgress {...item} />;
      case 1:
        return <RenderVideoProgress {...item} />;
      case 2:
      case 3:
        return <RenderPracticeExamProgress {...item} />;
      case 4:
        return <RenderLiveProgress {...item} />;
    }
    return null;
  };

  return (
    <>
      {list &&
        list.map((item: any) => {
          // 学习进度
          const currentData = assembleData(item, statics);
          const { nodeType } = item;
          if (item.next && item.next.length > 0) {
            return (
              <div key={item.name}>
                <div className="group2-child" key={item.name}>
                  <div
                    onClick={() => {
                      openClose(item);
                    }}
                  >
                    <div className="group3-child">
                      {hasPreClickId(preClickIdArr, item.name) ? (
                        // <IconExpand2 size={18} />
                        <div className="IconExpand2-svg"></div>
                      ) : (
                        // <IconShrink2 size={18} />
                        <div className="IconShrink2-svg "></div>
                      )}
                      <span className="text1-child" style={{ fontWeight: 400 }}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                  {!isHideProgress ? (
                    <div className="group4-child">
                      {RenderProgress({ ...item, ...currentData })}
                    </div>
                  ) : (
                    <div className="group4NoSpeed-child">
                      <span className="text3-child">
                        {currentData.spnum}人关注
                      </span>
                    </div>
                  )}
                </div>
                {hasPreClickId(preClickIdArr, item.name) ? (
                  <RecursionLevelChildren
                    list={item.next}
                    statics={statics}
                    current={current}
                    callback={callback}
                    productId={productId}
                    isHideProgress={isHideProgress}
                  />
                ) : null}
              </div>
            );
          } else {
            return nodeType === 'CU' || nodeType === 'SU' ? (
              <div className="group5-child" key={item.name}>
                <div onClick={() => callback && callback(item, productId)}>
                  <div className="group6-child">
                    <div className="children6-child">{renderIcon(item)}</div>
                    <span className="text4-child">{item.name}</span>
                  </div>
                  <div className="group7-child">
                    {RenderProgress({ ...item, ...currentData })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="group2-child" key={item.name}>
                <div
                  onClick={() => {
                    openClose(item);
                  }}
                >
                  <div className="group3-child">
                    {hasPreClickId(preClickIdArr, item.name) ? (
                      // <div className="IconExpand2">2</div>
                      <div className="iconfont IconExpand2 icon-expand_3_1 "></div>
                    ) : (
                      // <div className="IconShrink2">3</div>
                      <div className="iconfont IconShrink2  icon-expand_3_2"></div>
                      //   <IconShrink2 size={18} />
                      // <p></p>
                    )}
                    <span className="text1-child">{item.name}</span>
                  </div>
                </div>
                {!isHideProgress ? (
                  <div className="group4-child">
                    {RenderProgress({ ...item, ...currentData })}
                  </div>
                ) : null}
              </div>
            );
          }
        })}
    </>
  );
}
