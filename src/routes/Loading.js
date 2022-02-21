import React from "react";
import logo from "img/logo512.png";
import "css/loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={logo} alt="logo" className="loading-title" />
    </div>
  );
};

export default Loading;
