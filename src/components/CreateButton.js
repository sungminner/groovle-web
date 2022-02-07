import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/createbutton.css";

const CreateButton = ({ onCreateClick }) => {
  return (
    <>
      <div className="playbar-padding" />
      {/* 위 패딩은 임시 */}
      <div className="createbutton-wrapper">
        <div className="createbutton-flex">
          <div className="createbutton" onClick={onCreateClick}>
            <FontAwesomeIcon icon="plus" className="createbutton-plus" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateButton;
