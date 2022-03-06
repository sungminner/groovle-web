import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import HomePost from "components/HomePost";
import CreateButton from "components/CreateButton";
import base_URL from "base_URL";
import "css/home.css";

const Home = ({ setPlaylist }) => {
  const [songs, setSongs] = useState([]);
  const onPlayClick = (id) => {
    const songIDs = songs.map((song) => song.songID);
    const index = songIDs.indexOf(id);
    const playlist = songIDs.slice(index);
    setPlaylist(playlist);
  };
  const getData = async () => {
    await axios.get(`${base_URL}/api/show`).then((response) => {
      setSongs(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {songs.map((song) => (
        <HomePost songObj={song} onPlayClick={onPlayClick} key={song.songID} />
      ))}
      {/* <HomePost
        songObj={{
          songID: 111,
          title: "title",
          artist: "artist",
          randomKey: "aaaaaa",
        }}
        onPlayClick={onPlayClick}
      /> */}
      <CreateButton />
    </>
  );
};

export default Home;
