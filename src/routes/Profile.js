import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/profile.css";

const Profile = ({ userObj }) => {
  return (
    <>
      <div className="profile-userinfo">
        <img
          className="profile-img"
          src={
            userObj.picture
              ? userObj.picture
              : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          }
          alt="profile"
        />
        <div className="profile-userinfo-text">
          <div className="profile-userinfo-top">
            <p className="profile-name">{userObj?.name}</p>
            <div className="profile-session-wrapper">
              <p className="profile-session">{userObj?.mainSession}</p>
            </div>
          </div>
          <div className="profile-userinfo-bottom">
            <p className="profile-follower">{"181"} 팔로워</p>
            <p className="profile-following">{"190"} 팔로잉</p>
          </div>
        </div>
      </div>
      <div className="profile-bio">
        <p>{userObj?.bio}</p>
      </div>
      <div className="profile-button-wrapper">
        <button className="profile-button">팔로우</button>
      </div>
      <div className="profile-function-wrapper">
        <div className="profile-function">
          <FontAwesomeIcon icon="heart" className="profile-function-icon" />
          <p>Liked tracks</p>
        </div>
        <div className="profile-function">
          <FontAwesomeIcon icon="images" className="profile-function-icon" />
          <p>Playlist</p>
        </div>
        <Link to="/storage" className="profile-function">
          <FontAwesomeIcon icon="folder" className="profile-function-icon" />
          <p>storage</p>
        </Link>
      </div>
      <div className="profile-mymusic">
        <p className="profile-mymusic-title">참여한 곡</p>
        <div className="profile-mymusic-item">
          <p className="profile-mymusic-item-index">1</p>
          <img
            className="profile-mymusic-item-img"
            src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
            alt="album cover"
          />
          <div className="profile-mymusic-item-text">
            <p className="profile-mymusic-item-title">알루미늄</p>
            <p className="profile-mymusic-item-date">5일 전</p>
          </div>
          <div className="profile-mymusic-item-info">
            <div className="profile-mymusic-item-views">
              <FontAwesomeIcon icon="headset" />
              <p>53</p>
            </div>
            <div className="profile-mymusic-item-likes">
              <FontAwesomeIcon icon="heart" />
              <p>17</p>
            </div>
          </div>
        </div>
        <div className="profile-mymusic-item">
          <p className="profile-mymusic-item-index">1</p>
          <img
            className="profile-mymusic-item-img"
            src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
            alt="album cover"
          />
          <div className="profile-mymusic-item-text">
            <p className="profile-mymusic-item-title">알루미늄</p>
            <p className="profile-mymusic-item-date">5일 전</p>
          </div>
          <div className="profile-mymusic-item-info">
            <div className="profile-mymusic-item-views">
              <FontAwesomeIcon icon="headset" />
              <p>53</p>
            </div>
            <div className="profile-mymusic-item-likes">
              <FontAwesomeIcon icon="heart" />
              <p>17</p>
            </div>
          </div>
        </div>
        <div className="profile-mymusic-item">
          <p className="profile-mymusic-item-index">1</p>
          <img
            className="profile-mymusic-item-img"
            src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
            alt="album cover"
          />
          <div className="profile-mymusic-item-text">
            <p className="profile-mymusic-item-title">알루미늄</p>
            <p className="profile-mymusic-item-date">5일 전</p>
          </div>
          <div className="profile-mymusic-item-info">
            <div className="profile-mymusic-item-views">
              <FontAwesomeIcon icon="headset" />
              <p>53</p>
            </div>
            <div className="profile-mymusic-item-likes">
              <FontAwesomeIcon icon="heart" />
              <p>17</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
