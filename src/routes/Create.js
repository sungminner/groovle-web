import React from "react";
import "css/create.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="c-createsong__fixed">
      <Link to="/">
        <FontAwesomeIcon icon="chevron-left" className="c-createsong__close" />
      </Link>
      <div className="c-createsong__explanation">
        <p>나만의 연주를</p>
        <p>시작해 볼까요?</p>
      </div>
    </div>
  );
};

export default Create;
