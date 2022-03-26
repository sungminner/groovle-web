import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import base_URL from "base_URL";
import "css/playlist.css";

const Playlist = ({ playlist }) => {
  const [list, setList] = useState([]);
  const getSong = async (songID) => {
    let data;
    await axios.get(`${base_URL}/api/songbyid/${songID}`).then((response) => {
      data = response.data;
    });
    return data;
  };
  useEffect(() => {
    if (playlist.length !== 0) {
      const promises = playlist.map((id) => getSong(id));
      Promise.all(promises).then((result) => {
        setList(result);
      });
    }
  }, [playlist]);
  return (
    <>
      <div>
        <p>playlist</p>
        <br />
        {list.map((item) => (
          <div key={item.songID}>
            <p>{item.title}</p>
            <p>{item.artist}</p>
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default Playlist;
