import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import HomePost from "components/HomePost";
import CreateButton from "components/CreateButton";
import "css/home.css";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const onPlayClick = (id) => {
    console.log(`${id} clicked!`);
  };
  const getData = async () => {
    await axios.get("http://groovle.site/api/show").then((response) => {
      // await axios.get("http://localhost:4000/api/show").then((response) => {
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
