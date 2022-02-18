import React from "react";
import "css/notifications.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <>
      <div className="noti-wrapper">
        <div className="noti-today">
          <p className="noti-term">오늘</p>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>,{" "}
              <span className="noti-username">cclim.001</span>님 외 1명이 나를
              팔로우합니다.
              <span className="noti-datetime">1시간 전</span>
            </p>
            <div className="noti-item-target">
              <button>팔로우</button>
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 회원님의
              게시물을 좋아합니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 게시물
              2개를 플레이리스트에 담았습니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
        </div>
        <div className="noti-yesterday">
          <p className="noti-term">어제</p>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>,{" "}
              <span className="noti-username">cclim.001</span>님 외 1명이 나를
              팔로우합니다.
              <span className="noti-datetime">1시간 전</span>
            </p>
            <div className="noti-item-target">
              <button>팔로우</button>
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 회원님의
              게시물을 좋아합니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 게시물
              2개를 플레이리스트에 담았습니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
        </div>
        <div className="noti-thisweek">
          <p className="noti-term">이번 주</p>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>,{" "}
              <span className="noti-username">cclim.001</span>님 외 1명이 나를
              팔로우합니다.
              <span className="noti-datetime">1시간 전</span>
            </p>
            <div className="noti-item-target">
              <button>팔로우</button>
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 회원님의
              게시물을 좋아합니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 게시물
              2개를 플레이리스트에 담았습니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
        </div>
        <div className="noti-thismonth">
          <p className="noti-term">이번 달</p>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>,{" "}
              <span className="noti-username">cclim.001</span>님 외 1명이 나를
              팔로우합니다.
              <span className="noti-datetime">1시간 전</span>
            </p>
            <div className="noti-item-target">
              <button>팔로우</button>
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 회원님의
              게시물을 좋아합니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 게시물
              2개를 플레이리스트에 담았습니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
        </div>
        <div className="noti-earlier">
          <p className="noti-term">이전</p>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>,{" "}
              <span className="noti-username">cclim.001</span>님 외 1명이 나를
              팔로우합니다.
              <span className="noti-datetime">1시간 전</span>
            </p>
            <div className="noti-item-target">
              <button>팔로우</button>
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 회원님의
              게시물을 좋아합니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
          <div className="noti-item">
            <div>
              <img
                className="noti-item-img"
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
            <p className="noti-item-text">
              <span className="noti-username">patch_player</span>님이 게시물
              2개를 플레이리스트에 담았습니다.
              <span className="noti-datetime">1일</span>
            </p>
            <div className="noti-item-target">
              <img
                src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
                alt="notification"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
