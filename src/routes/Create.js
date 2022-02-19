import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import makeRandomKey from "functions/makeRandomKey";
import "css/create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    } else if (name === "artist") {
      setArtist(value);
    }
  };
  const onClick = async () => {
    const randomKey = makeRandomKey();
    await axios.post("http://wauriyouthchurch.create/api/createsong", {
      // await axios.post("http://localhost:4000/api/createsong", {
      title,
      artist,
      randomKey,
      headers: {
        "content-type": "application/json",
      },
    });
    setTitle("");
    setArtist("");
    navigate(`/song/${randomKey}`);
  };
  return (
    <>
      <div className="create">
        <p>제목</p>
        <input type="text" name="title" value={title} onChange={onChange} />
        <p>아티스트</p>
        <input type="text" name="artist" value={artist} onChange={onChange} />
        <input type="submit" value="save" onClick={onClick} />
        <p>녹음하기</p>
        <p>파일 불러오기</p>
      </div>
    </>
  );
};

export default Create;
