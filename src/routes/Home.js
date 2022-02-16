import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import HomePost from "components/HomePost";
import CreateButton from "components/CreateButton";
import CreateOptionModal from "components/CreateOptionModal";
import "css/home.css";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const getData = async () => {
    await axios.get("http://wauriyouthchurch.com/api/show").then((response) => {
      // await axios.get("http://localhost:4000/api/show").then((response) => {
      setSongs(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <>
      {songs.map((song) => (
        <HomePost songObj={song} key={song.id} />
      ))}
      <HomePost songObj={{ title: "title", artist: "artist" }} />
      <CreateButton toggleModal={toggleModal} />
      {modalOpen && (
        <CreateOptionModal toggleModal={toggleModal} getData={getData} />
      )}
    </>
  );
};

export default Home;
