import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Recorder from "components/Recorder";
import base_URL from "base_URL";
import "css/editor.css";

const Editor = ({ userObj }) => {
  // const AudioContext = window.AudioContext || window.webkitAudioContext;
  // const audioCtx = new AudioContext();
  // const audio = window.document.getElementById("audio");
  // useEffect(() => {
  //   if (audio) {
  //     const source = audioCtx.createMediaElementSource(audio);
  //     const gainNode = audioCtx.createGain();
  //     gainNode.gain.value = 1;
  //     source.connect(gainNode).connect(audioCtx.destination);
  //     console.log(source);
  //   }
  // }, [audio]);

  const { randomKey, sessionid } = useParams();
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
  const onPlay = () => {
    setIsPlaying(true);
    synthesized.current.play();
  };
  const onPause = () => {
    setIsPlaying(false);
    synthesized.current.pause();
  };
  const onRecordPlay = () => {
    setIsPlaying(true);
    synthesized.current.currentTime = 0;
    synthesized.current.play();
  };
  const onRecordStop = () => {
    setIsPlaying(false);
    synthesized.current.pause();
    synthesized.current.currentTime = 0;
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
      {songObj && (
        <>
          <p>synthesized</p>
          <audio
            ref={synthesized}
            src={`${base_URL}/api/playsong/${songID}`}
            controls
          />
        </>
      )}
      {isPlaying ? (
        <FontAwesomeIcon
          icon="pause"
          className="playbar-pause"
          onClick={onPause}
        />
      ) : (
        <FontAwesomeIcon
          icon="play"
          className="playbar-play"
          onClick={onPlay}
        />
      )}
      {/* {sessions &&
        sessions.map(
          (session) =>
            session.filename && (
              <div key={session.sessionID}>
                <p>{session.username}</p>
                <audio
                  src={`${base_URL}/api/playsession/${session.filename}`}
                  controls
                />
              </div>
            )
        )} */}
    </>
  );
};

export default Editor;
