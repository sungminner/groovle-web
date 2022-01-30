import React from "react";
import "css/explore.css";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import Navigation from "components/Navigation";

const CreateSong = () => {
  const onChange = () => {
    console.log("hi");
  };
  return (
    <>
      <Header currentPage="Explore" />
      <div className="explore-search">
        <input
          className="explore-search__input"
          type="text"
          name="search"
          onChange={onChange}
          placeholder="Find songs or artists"
          autoComplete="off"
        />
        <FontAwesomeIcon icon="search" className="explore-search__button" />
      </div>
      <div>People to follow</div>
      <div>World's Hot</div>
      <Navigation />
    </>
  );
};

export default CreateSong;
