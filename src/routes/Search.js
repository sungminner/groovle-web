import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/search.css";

const Search = () => {
  const onChange = () => {
    console.log("hi");
  };
  return (
    <>
      <div className="search-bar">
        <FontAwesomeIcon icon="search" className="search-bar-button" />
        <input
          className="search-bar-input"
          type="text"
          name="search"
          onChange={onChange}
          placeholder="Find songs, artists, crews or friends"
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default Search;
