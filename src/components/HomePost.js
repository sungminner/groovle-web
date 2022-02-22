import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowDimensions from "functions/useWindowDimensions";
import "css/homepost.css";

const HomePost = ({ songObj, onPlayClick }) => {
  const { width, height } = useWindowDimensions();
  return (
    <div
      className="home-post krReg"
      style={{
        width: width * 0.8,
        height: width * 0.8,
      }}
    >
      <img
        className="home-post-header-playbtn"
        onClick={() => onPlayClick(songObj.songID)}
        src="https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-02-512.png"
        alt="playbtn"
      />
      <Link to={`/song/${songObj.randomKey}`}>
        <img
          className="home-post-bgimg"
          src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
          alt="bgimg"
        />
        <div
          className="home-post-body"
          style={{
            width: width * 0.8 - 20,
            height: width * 0.8 - 20,
          }}
        >
          <div className="home-post-header">
            <p className="home-post-header-title krReg">{songObj.title}</p>
            <p className="home-post-header-artist krReg">{songObj.artist}</p>
          </div>
          <div
            className="home-post-main"
            style={{
              height: width * 0.8 - 136,
            }}
          >
            <div className="home-post-main-profile">
              <img
                className="home-post-main-profileimg"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg"
                alt="profileimg"
              />
              <div className="home-post-main-text">
                <p className="home-post-main-username">sung.minner</p>
                <p className="home-post-main-session">기타</p>
              </div>
            </div>
            <div className="home-post-main-profile">
              <img
                className="home-post-main-profileimg"
                src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
                alt="profileimg"
              />
              <div className="home-post-main-text">
                <p className="home-post-main-username">sfdsadfsadf</p>
                <p className="home-post-main-session">키보드</p>
              </div>
            </div>
            <div className="home-post-main-profile">
              <img
                className="home-post-main-profileimg"
                src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
                alt="profileimg"
              />
              <div className="home-post-main-text">
                <p className="home-post-main-username">rewerw</p>
                <p className="home-post-main-session">보컬</p>
              </div>
            </div>
          </div>
          <div
            className="home-post-footer"
            style={{
              width: width * 0.8 - 20,
            }}
          >
            <div className="home-post-footer-likes">
              <FontAwesomeIcon icon="heart" />
              <p>55</p>
            </div>
            <div className="home-post-footer-comment">
              <FontAwesomeIcon icon="comment-dots" />
              <p>14</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomePost;
