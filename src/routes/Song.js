import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/song.css";

const Song = () => {
  return (
    <>
      <div className="song-card">
        <img
          className="song-card-img"
          src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
          alt="bgimg"
        />
      </div>
      <div className="song-control">
        <div className="song-songinfo">
          <div>
            <p className="song-title">나의 어깨에 기대어요</p>
            <p className="song-artist">10cm</p>
          </div>
          <div className="song-like">
            <FontAwesomeIcon icon="heart" className="song-like-icon" />
            <p>13</p>
          </div>
        </div>
        <div className="song-progressbar"></div>
        <div className="song-time">
          <p className="song-currenttime">00:00</p>
          <p className="song-totaltime">3:16</p>
        </div>
        <div className="song-button">
          <FontAwesomeIcon icon="bars" />
          <div className="song-button-center">
            <FontAwesomeIcon icon="step-backward" className="playbar-prev" />
            <FontAwesomeIcon icon="play" className="playbar-play" />
            <FontAwesomeIcon icon="step-forward" className="playbar-next" />
          </div>
          <FontAwesomeIcon icon="redo-alt" />
        </div>
      </div>
      <div className="song-description">
        <p>소개</p>
        <p>
          나의 어깨에 기대어요 나의 어깨에 기대어요 나의 어깨에 기대어요 나의
          어깨에 기대어요 나의 어깨에 기대어요 나의 어깨에 기대어요 나의 어깨에
          기대어요 나의 어깨에 기대어요 나의 어깨에 기대어요 나의 어깨에
          기대어요 나의 어깨에 기대어요 나의 어깨에 기대어요
        </p>
      </div>
      <div className="song-reply">댓글</div>
      <Link to="/studio">합주 참여</Link>
    </>
  );
};

export default Song;
