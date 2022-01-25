import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/homepost.css";
import useWindowDimensions from "functions/getWindowDimensions";

const HomePost = () => {
  const { width, height } = useWindowDimensions();
  return (
    <div
      className="home-post krReg"
      style={{
        width: width * 0.8,
        height: width * 0.8,
      }}
    >
      <Link to="/song">
        <img
          className="home-post__bgimg"
          src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
          alt="bgimg"
        />
        <div
          className="home-post__body"
          style={{
            width: width * 0.8 - 20,
            height: width * 0.8 - 20,
          }}
        >
          <div className="home-post__header">
            <img
              className="home-post__header-albumimg"
              src="https://image.bugsm.co.kr/album/images/500/4343/434300.jpg"
              alt="albumimg"
            />
            <div className="home-post__header-text">
              <p className="home-post__header-title krReg">시퍼런 봄</p>
              <p className="home-post__header-artist krReg">쏜애플</p>
            </div>
            <img
              className="home-post__header-playbtn"
              src="https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-02-512.png"
              alt="playbtn"
            />
          </div>
          <div
            className="home-post__main"
            style={{
              height: width * 0.8 - 136,
            }}
          >
            <div className="home-post__main-profile">
              <img
                className="home-post__main-profileimg"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg"
                alt="profileimg"
              />
              <div className="home-post__main-text">
                <p className="home-post__main-username">sung.minner</p>
                <p className="home-post__main-session">기타</p>
              </div>
            </div>
            <div className="home-post__main-profile">
              <img
                className="home-post__main-profileimg"
                src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
                alt="profileimg"
              />
              <div className="home-post__main-text">
                <p className="home-post__main-username">sfdsadfsadf</p>
                <p className="home-post__main-session">키보드</p>
              </div>
            </div>
            <div className="home-post__main-profile">
              <img
                className="home-post__main-profileimg"
                src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
                alt="profileimg"
              />
              <div className="home-post__main-text">
                <p className="home-post__main-username">rewerw</p>
                <p className="home-post__main-session">보컬</p>
              </div>
            </div>
          </div>
          <div
            className="home-post__footer"
            style={{
              width: width * 0.8 - 20,
            }}
          >
            <div className="home-post__footer-like">
              <FontAwesomeIcon icon="heart" />
              <p>55</p>
            </div>
            <div className="home-post__footer-comment">
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
