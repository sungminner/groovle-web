import React, { useEffect, useRef, useState } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPending, setIsPending] = useState(false);
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
  const synthesizeOneFile = async () => {
    if (sessions.length === 1) {
      if (songObj.status === 1 || songObj.status === 3) {
        setIsPending(true);
        const filename = sessions[0].filename;
        console.log("synthesizeOneFile called");
        await axios
          .post(`${base_URL}/api/synthesizeonefile`, {
            filename,
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
      } else if (songObj.status === 2) {
        alert("이미 최신 버전입니다.");
      } else {
        alert("합성이 불가능합니다.");
      }
    } else {
      alert("세션이 2개 이상이어야 합성을 진행할 수 있습니다.");
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
          {isPlaying ? (
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
          )}
        </div>
      </div>
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
        {isPending ? (
          <div className="studio-synth-button ssb-disabled">
            <p>합성중...</p>
          </div>
        ) : (
          songObj &&
          songObj.createdBy === userObj.userID && (
            <div
              className="studio-synth-button"
              onClick={
                sessions && sessions.length > 1 ? synthesize : synthesizeOneFile
              }
            >
              <p>합성</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Studio;
