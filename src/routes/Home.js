import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CreateButton from "components/CreateButton";
import HomePost from "components/HomePost";
import "css/home.css";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const getData = async () => {
    await axios.get("http://localhost:4000/api/show").then((response) => {
      setSongs(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
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
    await axios.post("http://localhost:4000/api/test", {
      title,
      artist,
      headers: {
        "content-type": "application/json",
      },
    });
    setTitle("");
    setArtist("");
    getData();
  };
  return (
    <>
      {songs.map((song) => (
        <HomePost songObj={song} key={song.id} />
      ))}
      <p>제목</p>
      <input type="text" name="title" value={title} onChange={onChange} />
      <p>아티스트</p>
      <input type="text" name="artist" value={artist} onChange={onChange} />
      <input type="submit" value="save" onClick={onClick} />
      <CreateButton />
    </>
  );
};

export default Home;
