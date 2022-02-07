import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/createoptionmodal.css";

const CreateOptionModal = ({ onCreateClick }) => {
  return (
    <>
      <div className="com-wrapper" onClick={onCreateClick}>
        <div className="com-window">
          <p className="com-window-record">녹음하기</p>
          <p className="com-window-openfile">파일 불러오기</p>
        </div>
      </div>
    </>
  );
};

export default CreateOptionModal;
