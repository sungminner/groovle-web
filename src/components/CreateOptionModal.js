import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import makeRandomKey from "functions/makeRandomKey";
import "css/createoptionmodal.css";

const CreateOptionModal = ({ toggleModal, getData }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
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
    await axios.post("http://wauriyouthchurch.com/api/createsong", {
      // await axios.post("http://localhost:4000/api/createsong", {
      title,
      artist,
      randomKey: makeRandomKey(),
      headers: {
        "content-type": "application/json",
      },
    });
    setTitle("");
    setArtist("");
    getData();
    toggleModal();
  };
  return (
    <>
      <div className="com-wrapper">
        <div className="com-background" onClick={toggleModal} />
        <div className="com-window">
          <p>제목</p>
          <input type="text" name="title" value={title} onChange={onChange} />
          <p>아티스트</p>
          <input type="text" name="artist" value={artist} onChange={onChange} />
          <input type="submit" value="save" onClick={onClick} />
          <Link to="/recorder" className="com-window-record">
            <p>녹음하기</p>
          </Link>
          <Link to="/storage" className="com-window-openfile">
            <p>파일 불러오기</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateOptionModal;
