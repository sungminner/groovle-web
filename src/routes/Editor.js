import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePrevious from "functions/usePrevious";
import axios from "axios";
import base_URL from "base_URL";
import "css/editor.css";

const Editor = ({ userObj }) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

  const { randomKey, sessionid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [init, setInit] = useState(false);
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
  const getOffset = async () => {
    await axios
      .get(`${base_URL}/api/getoffset/${sessionid}`)
      .then((response) => {
        setOffset(response.data.syncOffset);
      });
  };
  useEffect(() => {
    getOffset();
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
    if (mySession.current && prevOffset) {
      if (offset > prevOffset) {
        sessionsRef.current.forEach((element) => {
          element.currentTime -= offset - prevOffset;
        });
      } else {
        mySession.current.currentTime -= prevOffset - offset;
      }
    }
  }, [offset]);
  const onAllSessionPlay = () => {
    if (!init) {
      if (offset > 0) {
        mySession.current.currentTime += offset;
      } else {
        sessionsRef.current.forEach((element) => {
          element.currentTime -= offset; // offset < 0????????? ??????
        });
      }
      setInit(true);
    }
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
  const onMySessionMute = () => {
    mySession.current.muted = !mySession.current.muted;
  };
  const onSyncForward = () => {
    setOffset((prev) => Number((prev + 0.01).toFixed(2)));
  };
  const onSyncBackward = () => {
    setOffset((prev) => Number((prev - 0.01).toFixed(2)));
  };
  const onSyncRefresh = () => {
    setOffset(0);
  };
  const onRecordSave = async () => {
    const reader = new FileReader();
    reader.onloadend = async (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      await axios
        .post(`${base_URL}/api/uploadsessionfile`, {
          songID,
          sessionID: sessionid,
          curStatus: songObj.status,
          data: result,
          extension: "mp3",
          offset,
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
  const onEditSave = async () => {
    await axios
      .post(`${base_URL}/api/editsession`, {
        songID,
        sessionID: sessionid,
        curStatus: songObj.status,
        offset,
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
                  src={`${base_URL}/api/loadsession/${session.filename}`}
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
      <br />
      <br />
      <br />
      <p>my audio</p>
      {location.state && location.state.blobUrl && (
        // Recorder?????? ????????? blob
        <div>
          <audio ref={mySession} src={location.state.blobUrl} controls />
          <button onClick={onRerecord}>?????????</button>
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
                  src={`${base_URL}/api/loadsession/${session.filename}`}
                />
                <FontAwesomeIcon
                  icon="volume-xmark"
                  className="editor-playbar-eachmute"
                  onClick={() => onMySessionMute(index)}
                />
              </div>
            )
        )}
      <br />
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
        <p>?????? ??????</p>
        <FontAwesomeIcon
          icon="minus"
          className="editor-sync-forward"
          onClick={onSyncForward}
        />
        <p>{-1 * offset * 1000}ms</p>
        <FontAwesomeIcon
          icon="plus"
          className="editor-sync-backward"
          onClick={onSyncBackward}
        />
        <p onClick={onSyncRefresh}>?????????</p>
        <br />
        {location.state && location.state.blobUrl ? (
          // Recorder?????? ????????? blob
          <div>
            <button onClick={onRecordSave}>??????</button>
          </div>
        ) : (
          <>
            <button onClick={onEditSave}>??????</button>
          </>
        )}
      </div>
    </>
  );
};

export default Editor;
