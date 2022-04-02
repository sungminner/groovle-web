import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import base_URL from "base_URL";
import "css/editor.css";

const Editor = ({ userObj }) => {
  const { randomKey, sessionid } = useParams();
  const location = useLocation();
  const [songID, setSongID] = useState(null);
  const [sessions, setSessions] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const sessionsRef = useRef([]);
  const mySession = useRef();
  const getSong = async () => {
    await axios.get(`${base_URL}/api/song/${randomKey}`).then((response) => {
      setSongID(response.data.songID);
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
  const onAllSessionPlay = () => {
    sessionsRef.current.forEach((element) => {
      element.play();
      setIsPlaying(true);
    });
  };
  const onAllSessionPause = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
      setIsPlaying(false);
    });
  };
  const onAllSessionRollBack = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
      element.currentTime = 0;
      setIsPlaying(false);
    });
  };
  const onAllSessionMute = () => {
    sessionsRef.current.forEach((element) => {
      element.muted = !element.muted;
    });
  };
  const onSessionMute = (index) => {
    sessionsRef.current[index].muted = !sessionsRef.current[index].muted;
  };
  return (
    <>
      <div className="editor-playbar-controls">
        <FontAwesomeIcon
          icon="step-backward"
          className="editor-playbar-allRollBack"
          onClick={onAllSessionRollBack}
        />
        {sessions && isPlaying ? (
          <FontAwesomeIcon
            icon="pause"
            className="editor-playbar-allpause"
            onClick={onAllSessionPause}
          />
        ) : (
          <FontAwesomeIcon
            icon="play"
            className="editor-playbar-allplay"
            onClick={onAllSessionPlay}
          />
        )}
        <FontAwesomeIcon
          icon="volume-xmark"
          className="editor-playbar-allmute"
          onClick={onAllSessionMute}
        />
      </div>
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
                  className="editor-playbar-eachmute"
                  onClick={() => onSessionMute(index)}
                />
              </div>
            )
        )}
      {location.state.blobUrl && (
        <audio ref={mySession} src={location.state.blobUrl} controls />
      )}
    </>
  );
};

export default Editor;
