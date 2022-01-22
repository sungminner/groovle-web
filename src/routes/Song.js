import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/song.css";

const Song = () => {
  return (
    <>
      <Link to="/">
        <FontAwesomeIcon icon="chevron-left" />
      </Link>
      <p>듣기</p>
      <div>커버 이미지 영역</div>
      <div>
        <p className="song__title">사랑한다는 말로도 위로가 되지 않는</p>
        <p className="song__artist">브로콜리너마저</p>
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
