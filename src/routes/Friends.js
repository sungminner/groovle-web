import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import "css/friends.css";

const Friends = () => {
  return (
    <>
      <Header currentPage="Friends" />
      <div>
        <p>Crews</p>
        <p>울림터</p>
        <p>Followings</p>
        <p>김요섭</p>
        <p>유혜리</p>
      </div>
    </>
  );
};

export default Friends;
