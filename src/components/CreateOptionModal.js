import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/createoptionmodal.css";

const CreateOptionModal = ({ onCreateClick }) => {
  return (
    <>
      <div className="com-wrapper" onClick={onCreateClick}>
        <div className="com-window">
          <Link to="/recorder" className="com-window-record">
            <p>녹음하기</p>
          </Link>
          <Link to="/storage" className="com-window-openfile">
            <p>파일 불러오기</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateOptionModal;
