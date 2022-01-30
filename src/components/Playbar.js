import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "css/playbar.css";
import logo from "img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Playbar = ({ currentPage }) => {
  return (
    <>
      <div className="playbar__padding" />
      <div className="playbar__wrapper">
        <div className="playbar">
          <p>playbar</p>
        </div>
      </div>
    </>
  );
};

export default Playbar;
