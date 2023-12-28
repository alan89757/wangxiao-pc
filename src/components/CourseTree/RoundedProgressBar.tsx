import React from "react";
import { Progress } from "antd";
// import { View } from 'react-native';
// import { Svg, Rect } from 'react-native-svg';

// export const RoundedProgressBar = ({ progress:any, width, height, color, borderRadius }) => {
export const RoundedProgressBar = (props: any) => {
  //   const barWidth = width;
  //   const barHeight = height;
  //   const progressWidth = barWidth * progress;
  // console.log(props, "propspropspropspropspropspropspropsprops");

  return (
    <div style={{ position: "relative", height: 8, width: 60 }}>
      <div style={{ width: 60, position: "absolute", top: -9, left: 0 }}>
        <Progress
          percent={props.speedRate * 100}
          size="small"
          status="exception"
          showInfo={false}
        />
      </div>
    </div>
  );
};
