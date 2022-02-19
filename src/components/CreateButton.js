import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/createbutton.css";

const CreateButton = () => {
  return (
    <>
      <div className="playbar-padding" />
      {/* 위 패딩은 임시 */}
      <div className="createbutton-wrapper">
        <div className="createbutton-flex">
          <div className="createbutton">
            <Link to="/create">
              <FontAwesomeIcon icon="plus" className="createbutton-plus" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateButton;
