import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/friends.css";

const Friends = () => {
  const onChange = () => {
    console.log("hi");
  };
  return (
    <>
      <Header currentPage="Friends" />
      <div className="friends-search">
        <input
          className="friends-search__input"
          type="text"
          name="search"
          onChange={onChange}
          placeholder="Find friends or crews"
          autoComplete="off"
        />
        <FontAwesomeIcon icon="search" className="friends-search__button" />
      </div>
      <div className="friends-tab__wrapper">
        <div className="friends-tab">
          <p className="friends-tab__title">Crews</p>
          <div className="friends-tab__body">
            <p>김요섭</p>
          </div>
        </div>
        <div className="friends-tab">
          <p className="friends-tab__title">Followings</p>
          <div className="friends-tab__body">
            <p>김요섭</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
