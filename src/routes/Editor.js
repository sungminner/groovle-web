import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePrevious from "functions/usePrevious";
import axios from "axios";
import base_URL from "base_URL";
import "css/editor.css";

const Editor = ({ userObj }) => {
  const { randomKey, sessionid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [songID, setSongID] = useState(null);
  const [songObj, setSongObj] = useState();
  const [sessions, setSessions] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [offset, setOffset] = useState(0);
  const sessionsRef = useRef([]);
  const mySession = useRef();
  const prevOffset = usePrevious(offset);
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
    sessionsRef.current = sessionsRef.current.slice(
      0,
      sessionsRef.current.length
    );
  }, [sessions]);
  useEffect(() => {
    console.log("current", offset);
    console.log("prev", prevOffset);
  }, [offset]);
  const onAllSessionPlay = () => {
    sessionsRef.current.forEach((element) => {
      element.play();
    });
    mySession.current.play();
    setIsPlaying(true);
  };
  const onAllSessionPause = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
    });
    mySession.current.pause();
    setIsPlaying(false);
  };
  const onAllSessionRollBack = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
      element.currentTime = offset >= 0 ? 0 : offset;
    });
    mySession.current.pause();
    mySession.current.currentTime = offset >= 0 ? offset : 0;
    setIsPlaying(false);
  };
  const onAllSessionMute = () => {
    sessionsRef.current.forEach((element) => {
      element.muted = !element.muted;
    });
    mySession.current.muted = !mySession.current.muted;
  };
  const onSessionMute = (index) => {
    sessionsRef.current[index].muted = !sessionsRef.current[index].muted;
  };
  const onSyncForward = () => {
    setOffset((prev) => Number((prev + 0.05).toFixed(2)));
  };
  const onSyncBackward = () => {
    setOffset((prev) => Number((prev - 0.05).toFixed(2)));
  };
  const onSyncRefresh = () => {
    setOffset(0);
  };
  const onSave = async () => {
    const reader = new FileReader();
    reader.onloadend = async (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      await axios
        .post(`${base_URL}/api/uploadsessionfile`, {
          songID: songID,
          sessionID: sessionid,
          curStatus: songObj.status,
          data: result,
          extension: "mp3",
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          navigate(`/studio/${randomKey}`, {
            replace: true,
          });
        });
    };
    reader.readAsDataURL(location.state.blob);
  };
  const onRerecord = () => {
    navigate(`/studio/${randomKey}/recorder/${sessionid}`, {
      replace: true,
    });
  };
  return (
    <>
      {sessions &&
        sessions.map(
          (session, index) =>
            session.sessionID !== Number(sessionid) &&
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
      <br />
      <p>my audio</p>
      {location.state && location.state.blobUrl && (
        // Recorder에서 넘어온 blob
        <div>
          <audio ref={mySession} src={location.state.blobUrl} controls />
          <button onClick={onSave}>저장</button>
          <button onClick={onRerecord}>재녹음</button>
        </div>
      )}
      {sessions &&
        sessions.map(
          (session, index) =>
            session.sessionID === Number(sessionid) &&
            session.filename && (
              <div key={session.sessionID}>
                <p>{session.username}</p>
                <audio
                  ref={mySession}
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
      <div className="editor-sync">
        <p>싱크 조절</p>
        <FontAwesomeIcon
          icon="minus"
          className="editor-sync-forward"
          onClick={onSyncForward}
        />
        <p>{-1 * offset}ms</p>
        <FontAwesomeIcon
          icon="plus"
          className="editor-sync-backward"
          onClick={onSyncBackward}
        />
        <p onClick={onSyncRefresh}>초기화</p>
      </div>
    </>
  );
};

export default Editor;
