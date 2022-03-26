import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Recorder from "components/Recorder";
import base_URL from "base_URL";
import "css/editor.css";

const Editor = ({ userObj }) => {
  const { randomKey, sessionid } = useParams();
  const [songID, setSongID] = useState(null);
  const [songObj, setSongObj] = useState();
  const [sessions, setSessions] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const sessionsRef = useRef([]);
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
  useEffect(() => {
    sessionsRef.current = sessionsRef.current.slice(0, sessionsRef.length);
  }, [sessions]);
  const onSessionPlay = () => {
    sessionsRef.current.forEach((element) => {
      element.play();
      setIsPlaying(true);
    });
  };
  const onSessionPause = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
      setIsPlaying(false);
    });
  };
  const onSessionMute = (index) => {
    sessionsRef.current[index].muted = !sessionsRef.current[index].muted;
  };
  const onRecordPlay = () => {
    sessionsRef.current.forEach((element) => {
      element.currentTime = 0;
      element.play();
      setIsPlaying(true);
    });
  };
  const onRecordStop = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
      element.currentTime = 0;
      setIsPlaying(false);
    });
  };
  return (
    <>
      {songObj && (
        <div>
          <Recorder
            songObj={songObj}
            onRecordPlay={onRecordPlay}
            onRecordStop={onRecordStop}
          />
        </div>
      )}
      {sessions && isPlaying ? (
        <FontAwesomeIcon
          icon="pause"
          className="studio-playbar-pause"
          onClick={onSessionPause}
        />
      ) : (
        <FontAwesomeIcon
          icon="play"
          className="studio-playbar-play"
          onClick={onSessionPlay}
        />
      )}
      {sessions &&
        sessions.map(
          (session, index) =>
            session.filename && (
              <div key={session.sessionID}>
                <p>{session.username}</p>
                <audio
                  ref={(element) => (sessionsRef.current[index] = element)}
                  src={`${base_URL}/api/playsession/${session.filename}`}
                  controls
                />
                <FontAwesomeIcon
                  icon="volume-xmark"
                  className="playbar-mute"
                  onClick={() => onSessionMute(index)}
                />
              </div>
            )
        )}
    </>
  );
};

export default Editor;
