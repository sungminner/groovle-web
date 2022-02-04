import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/createbutton.css";

const CreateButton = ({ currentPage }) => {
  return (
    <>
      <div className="playbar-padding" />
      <div className="createbutton-wrapper">
        <div className="createbutton-flex">
          <div className="createbutton">
            <FontAwesomeIcon icon="plus" className="createbutton-plus" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateButton;
