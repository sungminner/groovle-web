import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import StudioMember from "components/StudioMember";
import base_URL from "base_URL";
import "css/studio.css";

const Studio = ({ userObj }) => {
  const { randomKey } = useParams();
  const [songID, setSongID] = useState(null);
  const [songObj, setSongObj] = useState();
  const [sessions, setSessions] = useState();
  const [isPending, setIsPending] = useState(false);
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
  const synthesize = async () => {
    if (!songObj.synthReady && sessions.length > 1) {
      setIsPending(true);
      const files = sessions.map((session) => session.filename);
      console.log("synthesize called");
      await axios
        .post(`${base_URL}/synthesize`, {
          files,
          songID,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.data) {
            setIsPending(false);
            getSong(); // 합성 버튼을 안 보이게 하기 위해
          }
        });
    }
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
          <FontAwesomeIcon icon="plus" onClick={addSession} />
          {isPending ? (
            <p>합성중...</p>
          ) : (
            songObj &&
            sessions &&
            songObj.createdBy === userObj.userID &&
            !songObj.synthReady &&
            sessions.length > 1 && <p onClick={synthesize}>합성</p>
          )}
        </div>
        {sessions &&
          sessions.map((session) => (
            <StudioMember
              userObj={userObj}
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
