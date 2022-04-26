import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import StudioMember from "components/StudioMember";
import base_URL from "base_URL";
import "css/studio.css";

const Studio = ({ userObj }) => {
  const { randomKey } = useParams();
  const navigate = useNavigate();
  const [songID, setSongID] = useState(null);
  const [songObj, setSongObj] = useState();
  const [sessions, setSessions] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const synthesized = useRef(null);
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
  }, []);
  useEffect(() => {
    if (songID) {
      getSession();
    }
  }, [songID]);
  const addSession = async () => {
    await axios
      .post(`${base_URL}/api/createsession`, {
        userID: userObj.userID,
        songID,
        headers: {
          "content-type": "application/json",
        },
      })
      .then(() => {
        getSession();
      });
  };
  const onSynthesizedPlay = () => {
    synthesized.current.play();
    setIsPlaying(true);
  };
  const onSynthesizedPause = () => {
    synthesized.current.pause();
    setIsPlaying(false);
  };
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
          {songObj &&
            (songObj.status === 0 ? (
              <FontAwesomeIcon
                icon="play"
                className="studio-playbar-play-disabled"
              />
            ) : isPlaying ? (
              <FontAwesomeIcon
                icon="pause"
                className="studio-playbar-pause"
                onClick={onSynthesizedPause}
              />
            ) : (
              <FontAwesomeIcon
                icon="play"
                className="studio-playbar-play"
                onClick={onSynthesizedPlay}
              />
            ))}
        </div>
      </div>
      {songObj &&
      (songObj.status === 2 || songObj.status === 3 || songObj.status === 4) ? (
        <audio
          ref={synthesized}
          src={`${base_URL}/api/playsong/${songID}.mp3`}
        />
      ) : (
        <></>
      )}
      <div className="studio-team">
        <div className="studio-team-menu">
          <p>My Team</p>
          <FontAwesomeIcon icon="plus" onClick={addSession} />
        </div>
        {sessions &&
          sessions.map((session) => (
            <StudioMember
              userObj={userObj}
              songObj={songObj}
              sessionObj={session}
              getSong={getSong}
              getSession={getSession}
              key={session.sessionID}
            />
          ))}
      </div>
      <div className="studio-synth-button-padding" />
      <div className="studio-synth-button-wrapper">
        <div
          onClick={() =>
            navigate(`/studio/${randomKey}/synthesize`, {
              state: {
                songObj,
                sessions,
                randomKey,
                offsets: sessions.map((session) => session.syncOffset),
              },
            })
          }
          className="studio-synth-button"
        >
          <p>합성</p>
        </div>
      </div>
    </>
  );
};

export default Studio;
