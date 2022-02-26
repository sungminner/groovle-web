import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "components/GoogleLoginButton";
import base_URL from "base_URL";
import "css/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [googleID, setGoogleID] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const onGoogleLogin = (googleId) => {
    setGoogleID(googleId);
    if (googleId) {
      // console.log("구글 로그인 성공", googleId);
      setProgress((prev) => prev + 1);
    } else {
      // console.log("구글 로그인 실패");
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "username") {
      setUsername(value);
      console.log("username: ", value);
    } else if (name === "name") {
      setName(value);
      console.log("name: ", value);
    }
  };
  const onProgress = (event) => {
    event.preventDefault();
    setProgress((prev) => prev + 1);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`${base_URL}/api/createuser`, {
        googleID,
        username,
        name,
        headers: {
          "content-type": "application/json",
        },
      })
      .then(navigate("/"));
  };
  return (
    <>
      {progress === 0 && (
        <div>
          <GoogleLoginButton onGoogleLogin={onGoogleLogin} />
        </div>
      )}
      {progress === 1 && (
        <form onSubmit={onProgress}>
          <p>새로운 계정에 사용할 아이디를 설정하세요.</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
          />
          <input type="submit" value="다음" />
        </form>
      )}
      {progress === 2 && (
        <form onSubmit={onProgress}>
          <p>이름을 입력하세요.</p>
          <input type="text" name="name" value={name} onChange={onChange} />
          <input type="submit" value="다음" />
          <p>건너뛰기</p>
        </form>
      )}
      {progress === 3 && (
        <form onSubmit={onSubmit}>
          <p>프로필 사진을 설정하세요.</p>
          <input type="file" name="profileimg" />
          <input type="submit" value="완료" />
          <p>건너뛰기</p>
        </form>
      )}
      <br />
      <div>
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
