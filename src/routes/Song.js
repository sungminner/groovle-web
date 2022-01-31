import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import "css/song.css";

const Song = () => {
  return (
    <>
      <Header currentPage="Song" />
      <div className="song-cover">
        <img
          className="song-cover__img"
          src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
          alt="bgimg"
        />
      </div>
      <div>
        <p className="song__title">나의 어깨에 기대어요</p>
        <p className="song__artist">10cm</p>
        <p>방장: 기타왕</p>
        <p>
          <FontAwesomeIcon icon="heart" />
          13
        </p>
      </div>
      <hr />
      <div>설명</div>
      <div>댓글</div>
      <Link to="/studio">합주 참여</Link>
    </>
  );
};

export default Song;
