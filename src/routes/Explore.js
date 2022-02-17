import React from "react";
import "css/explore.css";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import beautiful from "NAS/test/beautiful.mp3";

const Explore = () => {
  const onChange = () => {
    console.log("hi");
  };
  return (
    <>
      <div className="explore-search">
        <FontAwesomeIcon icon="search" className="explore-search__button" />
        <input
          className="explore-search__input"
          type="text"
          name="search"
          onChange={onChange}
          placeholder="Find songs or artists"
          autoComplete="off"
        />
      </div>
      <div>People to follow</div>
      <div>World's Hot</div>
      <audio src={beautiful} controls />
    </>
  );
};

export default Explore;
