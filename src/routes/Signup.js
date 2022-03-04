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
  const onGoogleSignup = async (response) => {
    // OAuth2 정석 개발 필요
    try {
      await axios
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.tokenId}`
        )
        .then((res) => {
          console.log(res.data);
          setGoogleID(res.data.sub.split("").reverse().join(""));
          setProgress((prev) => prev + 1);
        });
    } catch (e) {
      throw e;
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
      .then((res) => {
        if (res.data) {
          window.localStorage.setItem("id", googleID);
          navigate("/");
        }
      });
  };
  return (
    <>
      {progress === 0 && (
        <div>
          <GoogleLoginButton onSuccess={onGoogleSignup} />
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
        <form onSubmit={onSubmit}>
          <p>이름을 입력하세요.</p>
          <input type="text" name="name" value={name} onChange={onChange} />
          <input type="submit" value="완료" />
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
