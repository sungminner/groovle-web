import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Recorder from "components/Recorder";
import base_URL from "base_URL";
import "css/editor.css";

class Track {
  constructor(outputNode, element) {
    this._context = outputNode.context;
    this._element = element;
    this._outputNode = outputNode;
    this._source = new MediaElementAudioSourceNode(this._context, {
      mediaElement: this._element,
    });
    this._amp = new GainNode(this._context);
    this._source.connect(this._amp).connect(this._outputNode);
    this._muted = false;
  }

  toggleMute() {
    if (this._muted) {
      this._amp.gain.value = 1;
      this._muted = false;
    } else {
      this._amp.gain.value = 0;
      this._muted = true;
    }
  }

  // play() {}

  // pause() {
  //   console.log(this._context.state);
  //   // this._element.pause();
  //   if (this._context.state === "running") {
  //     this._element.pause();
  //     // this._context.suspend().then(() => {
  //     //   console.log("suspended");
  //     // });
  //   } else if (this._context.state === "suspended") {
  //     this._element.play();
  //     // this._context.resume().then(() => {
  //     //   console.log("resumed");
  //     // });
  //   }
  // }
}

const Editor = ({ userObj }) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const { randomKey, sessionid } = useParams();
  const [songID, setSongID] = useState(null);
  const [songObj, setSongObj] = useState();
  const [sessions, setSessions] = useState();
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthesized = useRef(null);
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
    if (sessionsRef.current.length !== 0) {
      sessionsRef.current.forEach((element) => {
        setTracks((prev) => [
          ...prev,
          new Track(audioCtx.destination, element),
        ]);
      });
    }
  }, [sessions]);
  useEffect(() => {
    console.log(tracks);
  }, [tracks]);
  const onSynthesizedPlay = () => {
    synthesized.current.play();
    setIsPlaying(true);
  };
  const onSynthesizedPause = () => {
    synthesized.current.pause();
    setIsPlaying(false);
  };
  const onSessionPlay = (index) => {
    sessionsRef.current.forEach((element) => {
      element.play();
    });
    // tracks[index].play();
    console.log(index);
  };
  const onSessionPause = (index) => {
    sessionsRef.current.forEach((element) => {
      element.pause();
    });
    // tracks[index].pause();
    console.log(index);
  };
  const onSessionMute = (index) => {
    console.log(index, "mute");
    tracks[index].toggleMute();
  };
  const onRecordPlay = () => {
    synthesized.current.currentTime = 0;
    synthesized.current.play();
    setIsPlaying(true);
  };
  const onRecordStop = () => {
    synthesized.current.pause();
    synthesized.current.currentTime = 0;
    setIsPlaying(false);
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
          onClick={onSynthesizedPause}
        />
      ) : (
        <FontAwesomeIcon
          icon="play"
          className="playbar-play"
          onClick={onSynthesizedPlay}
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
                  icon="play"
                  className="playbar-play"
                  onClick={() => onSessionPlay(index)}
                />
                <FontAwesomeIcon
                  icon="pause"
                  className="playbar-pause"
                  onClick={() => onSessionPause(index)}
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
