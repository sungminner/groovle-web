import React from "react";
import "css/explore.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CreateSong = () => {
  return (
    <>
      <p>스튜디오</p>
      <div>
        <p className="song__title">사랑한다는 말로도 위로가 되지 않는</p>
        <p className="song__artist">브로콜리너마저</p>
        <p>방장: 기타왕</p>
      </div>
      <p>My Team +</p>
      <div>팀원 표시 영역</div>
      <Link to="/studio/recorder">녹음하기</Link>
    </>
  );
};

export default CreateSong;
