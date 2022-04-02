import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import base_URL from "base_URL";
import "css/synthesize.css";

const Synthesize = ({ userObj }) => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const songObj = location.state.songObj;
  const sessions = location.state.sessions;
  const randomKey = location.state.randomKey;
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
            volumes: [1, 10],
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
      <div>
        <p>synthesize</p>
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
