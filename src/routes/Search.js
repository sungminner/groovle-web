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
        <input
          className="search-bar__input"
          type="text"
          name="search"
          onChange={onChange}
          placeholder="Find songs, artists, crews or friends"
          autoComplete="off"
        />
        <FontAwesomeIcon icon="search" className="search-bar__button" />
      </div>
    </>
  );
};

export default Search;
