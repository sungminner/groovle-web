import React from "react";
import "css/explore.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
import Header from "components/Header";
import Navigation from "components/Navigation";

const CreateSong = () => {
  return (
    <>
      <Header currentPage="Explore" />
      <p>Explore</p>
      <div>검색</div>
      <div>People to follow</div>
      <div>World's Hot</div>
      <Navigation />
    </>
  );
};

export default CreateSong;
