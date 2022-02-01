import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "css/playbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Playbar = ({ currentPage }) => {
  const [cnt, setCnt] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCnt(cnt + 1);
    }, 1000);
    return () => clearInterval(timer);
  });
  return (
    <>
      <div className="playbar-padding" />
      <div className="playbar-wrapper">
        <div className="playbar">
          <div className="playbar-playlist">
            <FontAwesomeIcon icon="bars" />
          </div>
          <div className="playbar-text">
            <p className="playbar-title">나의 어깨에 기대어요 {cnt}</p>
            <p className="playbar-member">sung.minner, ajsdfl1232</p>
          </div>
          <div className="playbar-control">
            <FontAwesomeIcon icon="step-backward" className="playbar-prev" />
            <FontAwesomeIcon icon="play" className="playbar-play" />
            <FontAwesomeIcon icon="step-forward" className="playbar-next" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Playbar;
