import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import base_URL from "base_URL";
import "css/welcome.css";

const Welcome = ({ userObj }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "username") {
      setUsername(value);
    } else if (name === "name") {
      setName(value);
    }
  };
  const updateUser = async (key, value) => {
    const id = window.localStorage.getItem("id");
    await axios
      .post(`${base_URL}/api/updateuser`, {
        id,
        key,
        value,
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.data) {
          console.log("update success!");
        }
      });
  };
  return (
    <>
      <Link to="/">홈으로</Link>
      <p>시작하기 전 몇 단계를 완료해야 합니다.</p>
      {userObj && (
        <>
          {!userObj.username && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateUser("username", username);
              }}
            >
              <p>username 설정</p>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
              />
              <input type="submit" value="저장" />
            </form>
          )}
          {!userObj.name && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateUser("name", name);
              }}
            >
              <p>name 설정</p>
              <input type="text" name="name" value={name} onChange={onChange} />
              <input type="submit" value="저장" />
            </form>
          )}
        </>
      )}
    </>
  );
};

export default Welcome;
