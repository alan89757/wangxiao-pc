import React from "react";
import "../css/TeacherCard.scss";
function TeacherCard(props: any) {

  return (
    <div className={props.index == 0 ? "card" : "card card-top"}>
      <div className="card-level-1">
        <div>
          <div className="card-name">{props.info.name}</div>
          <div className="card-line"></div>
        </div>
        <img src={props.info.photo} className="teacher-img" />
      </div>
      <p className="card-level-2">{props.info.introduce}</p>
    </div>
  );
}

export default TeacherCard;
