import React from "react";
import logo from "img/logo512.png";
import "css/loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={logo} alt="logo" className="loading-title" />
    </div>
  );
  // Setting up your bass drum...
  // Tuning up your piano...
  // Running...이면 ...이 점점 생기는 애니메이션
  // Heating up이면 점점 달아오르는 애니메이션
  // 사용자의 악기에 맞는 문구
};

export default Loading;
