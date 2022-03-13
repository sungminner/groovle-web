import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import makeRandomKey from "functions/makeRandomKey";
import base_URL from "base_URL";
import "css/create.css";

const Create = ({ userObj }) => {
  const navigate = useNavigate();
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
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj) {
      const randomKey = makeRandomKey();
      await axios.post(`${base_URL}/api/createsong`, {
        title,
        artist,
        createdBy: userObj.userID,
        randomKey,
        headers: {
          "content-type": "application/json",
        },
      });
      setTitle("");
      setArtist("");
      navigate(`/song/${randomKey}`, { replace: true });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="create">
        <form onSubmit={onSubmit}>
          <div>
            <p>제목</p>
            <input type="text" name="title" value={title} onChange={onChange} />
          </div>
          <div>
            <p>아티스트</p>
            <input
              type="text"
              name="artist"
              value={artist}
              onChange={onChange}
            />
          </div>
          <div>
            <input type="submit" value="save" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
