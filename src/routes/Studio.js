import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import base_URL from "base_URL";
import "css/studio.css";
import StudioMember from "components/StudioMember";

const Studio = () => {
  const { randomKey } = useParams();
  const [songID, setSongID] = useState(null);
  const [songObj, setSongObj] = useState();
  const [sessions, setSessions] = useState();
  const getSong = async () => {
    await axios.get(`${base_URL}/api/song/${randomKey}`).then((response) => {
      setSongID(response.data.songID);
      setSongObj(response.data);
    });
  };
  const getSession = async () => {
    await axios.get(`${base_URL}/api/session/${songID}`).then((response) => {
      setSessions(response.data);
    });
  };
  useEffect(() => {
    getSong();
    if (songID) {
      getSession();
    }
  }, [songID]);
  return (
    <>
      <div className="studio-playbar">
        <div className="studio-playbar-bgimg-wrapper">
          <img
            className="studio-playbar-bgimg"
            src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
            alt="bgimg"
          />
        </div>
        <div className="studio-playbar-songinfo">
          <p className="studio-playbar-title">{songObj?.title}</p>
          <p className="studio-playbar-artist">{songObj?.artist}</p>
        </div>
        <div className="studio-playbar-control">
          <FontAwesomeIcon icon="play" className="studio-play" />
        </div>
      </div>
      <div className="studio-team">
        <div className="studio-team-menu">
          <p>My Team</p>
          <FontAwesomeIcon icon="plus" className="" />
        </div>
        {sessions &&
          sessions.map((session) => (
            <StudioMember
              sessionObj={session}
              getSession={getSession}
              key={session.sessionID}
            />
          ))}
      </div>
    </>
  );
};

export default Studio;
