import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import base_URL from "base_URL";
import "css/synthesize.css";

const Synthesize = ({ userObj }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [volumes, setVolumes] = useState([]);
  const sessionsRef = useRef([]);
  const songObj = location.state.songObj;
  const sessions = location.state.sessions;
  const randomKey = location.state.randomKey;
  useEffect(() => {
    sessionsRef.current = sessionsRef.current.slice(
      0,
      sessionsRef.current.length
    );
    setVolumes(new Array(sessionsRef.current.length).fill(1));
  }, [sessions]);
  useEffect(() => {
    console.log(volumes);
  }, [volumes]);
  const onAllSessionPlay = () => {
    sessionsRef.current.forEach((element) => {
      element.play();
    });
    setIsPlaying(true);
  };
  const onAllSessionPause = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
    });
    setIsPlaying(false);
  };
  const onAllSessionRollBack = () => {
    sessionsRef.current.forEach((element) => {
      element.pause();
      element.currentTime = 0;
    });
    setIsPlaying(false);
  };
  const onAllSessionMute = () => {
    sessionsRef.current.forEach((element) => {
      element.muted = !element.muted;
    });
  };
  const changeVolume = (index) => (e) => {
    const changed = [...volumes];
    changed[index] = e.target.value;
    sessionsRef.current[index].volume = e.target.value / 2;
    setVolumes(changed);
  };
  const synthesizeOneFile = async () => {
    if (sessions.length === 1) {
      if (songObj.status === 1 || songObj.status === 3) {
        setIsPending(true);
        const filename = sessions[0].filename;
        console.log("synthesizeOneFile called");
        await axios
          .post(`${base_URL}/api/synthesizeonefile`, {
            filename,
            songID: songObj.songID,
            headers: {
              "content-type": "application/json",
            },
          })
          .then((response) => {
            if (response.data) {
              setIsPending(false);
              navigate(`/song/${randomKey}`, { replace: true });
            }
          });
      } else if (songObj.status === 2) {
        alert("이미 최신 버전입니다.");
      } else {
        alert("합성이 불가능합니다.");
      }
    } else {
      alert("세션이 1개일 때의 기능입니다.");
    }
  };
  const synthesize = async () => {
    if (sessions.length > 1) {
      if (songObj.status === 1 || songObj.status === 3) {
        setIsPending(true);
        const filenames = sessions.map((session) => session.filename);
        console.log("synthesize called");
        await axios
          .post(`${base_URL}/synthesize`, {
            filenames,
            volumes,
            songID: songObj.songID,
            headers: {
              "content-type": "application/json",
            },
          })
          .then((response) => {
            if (response.data) {
              setIsPending(false);
              navigate(`/song/${randomKey}`, { replace: true });
            }
          });
      } else if (songObj.status === 2) {
        alert("이미 최신 버전입니다.");
      } else {
        alert("합성이 불가능합니다.");
      }
    } else {
      alert("세션이 2개 이상이어야 합성을 진행할 수 있습니다.");
    }
  };
  return (
    <>
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
                <input
                  type="range"
                  value={volumes[index]}
                  max="2"
                  min="0"
                  step="0.01"
                  onChange={changeVolume(index)}
                />
              </div>
            )
        )}
      <div className="synthesize-playbar-controls">
        <FontAwesomeIcon
          icon="step-backward"
          className="synthesize-playbar-allRollBack"
          onClick={onAllSessionRollBack}
        />
        {sessions && isPlaying ? (
          <FontAwesomeIcon
            icon="pause"
            className="synthesize-playbar-allpause"
            onClick={onAllSessionPause}
          />
        ) : (
          <FontAwesomeIcon
            icon="play"
            className="synthesize-playbar-allplay"
            onClick={onAllSessionPlay}
          />
        )}
        <FontAwesomeIcon
          icon="volume-xmark"
          className="synthesize-playbar-allmute"
          onClick={onAllSessionMute}
        />
      </div>
      <div>
        <p>synthesize</p>
        <div className="synthesize-synth-button-padding" />
        <div className="synthesize-synth-button-wrapper">
          {isPending ? (
            <div className="synthesize-synth-button ssb-disabled">
              <p>합성중...</p>
            </div>
          ) : (
            songObj &&
            songObj.createdBy === userObj.userID && (
              <div
                className="synthesize-synth-button"
                onClick={
                  sessions && sessions.length > 1
                    ? synthesize
                    : synthesizeOneFile
                }
              >
                <p>합성</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Synthesize;
