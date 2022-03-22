import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import makeRandomKey from "functions/makeRandomKey";
import songSearch from "functions/songSearch";
import base_URL from "base_URL";
import "css/create.css";

const Create = ({ userObj }) => {
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const onChange = async (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "search") {
      setSearchStr(value);
      const results = value ? await songSearch(value) : [];
      setSearchResult(
        results.map((result) => ({ title: result.name, artist: result.artist }))
      );
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "artist") {
      setArtist(value);
    }
  };
  const onResultClick = (event) => {
    setTitle(event.currentTarget.dataset.title);
    setArtist(event.currentTarget.dataset.artist);
    setSearchStr("");
    setSearchResult([]);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj) {
      const randomKey = makeRandomKey();
      await axios.post(`${base_URL}/api/createsong`, {
        title,
        artist,
        createdBy: userObj.userID,
        randomKey,
        headers: {
          "content-type": "application/json",
        },
      });
      setTitle("");
      setArtist("");
      navigate(`/song/${randomKey}`, { replace: true });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="create">
        <div className="create-search">
          <input
            type="text"
            name="search"
            value={searchStr}
            onChange={onChange}
            placeholder="곡 검색"
            autoComplete="off"
          />
          <div className="create-search-result">
            {searchResult.map((song, index) => (
              <div
                key={index}
                className="create-search-result-block"
                data-title={song["title"]}
                data-artist={song["artist"]}
                onClick={onResultClick}
              >
                <p className="create-search-result-title">{song["title"]}</p>
                <p className="create-search-result-artist">{song["artist"]}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={onSubmit} className="create-form">
          <div className="create-form-title">
            <p>제목</p>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="곡 제목"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="create-form-artist">
            <p>아티스트</p>
            <input
              type="text"
              name="artist"
              value={artist}
              placeholder="아티스트"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="방 만들기"
              className="create-form-button"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
