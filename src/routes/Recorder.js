import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecordButton from "components/RecordButton";
import axios from "axios";
import base_URL from "base_URL";
import "css/recorder.css";

const Recorder = ({ userObj }) => {
  const { randomKey, sessionid } = useParams();
  const [songID, setSongID] = useState(null);
  const [songObj, setSongObj] = useState();
  const [sessions, setSessions] = useState();
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
  const onAllSessionMute = () => {
    sessionsRef.current.forEach((element) => {
      element.muted = !element.muted;
    });
  };
  const onSessionMute = (index) => {
    sessionsRef.current[index].muted = !sessionsRef.current[index].muted;
  };
  const onRecordPlay = () => {
    sessionsRef.current.forEach((element) => {
      element.currentTime = 0;
      element.play();
    });
  };
  const onRecordStop = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
      element.currentTime = 0;
    });
  };
  return (
    <>
      <div className="editor-playbar-controls">
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
      {songObj && (
        <div>
          <RecordButton
            songObj={songObj}
            onRecordPlay={onRecordPlay}
            onRecordStop={onRecordStop}
          />
        </div>
      )}
    </>
  );
};

export default Recorder;
