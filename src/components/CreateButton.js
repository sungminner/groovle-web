import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/createbutton.css";

const CreateButton = ({ currentPage }) => {
  return (
    <>
      <div className="createbutton">
        <FontAwesomeIcon icon="plus" className="createbutton-plus" />
      </div>
    </>
  );
};

export default CreateButton;
