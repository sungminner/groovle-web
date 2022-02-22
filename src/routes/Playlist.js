import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import base_URL from "base_URL";
import "css/playlist.css";

const Playlist = ({ playlist }) => {
  const [list, setList] = useState([]);
  const getSong = async (songID) => {
    await axios.get(`${base_URL}/api/songbyid/${songID}`).then((response) => {
      setList((prev) => [...prev, response.data]);
    });
  };
  useEffect(() => {
    if (playlist.length !== 0) {
      playlist.forEach((id) => getSong(id));
    }
  }, [playlist]);
  return (
    <>
      <div>
        <p>playlist</p>
        <br />
        {list.map((item) => (
          <>
            <p>{item.title}</p>
            <p>{item.artist}</p>
            <br />
          </>
        ))}
      </div>
    </>
  );
};

export default Playlist;
