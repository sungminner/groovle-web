import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePathname from "functions/usePathname";
import useInterval from "functions/useInterval";
import "css/playbar.css";

const Playbar = () => {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(false);
  const [cnt, setCnt] = useState(0);
  const toggleStatus = () => {
    setIsPlaying((prev) => !prev);
  };
  useInterval(
    () => {
      setCnt(cnt + 1);
    },
    isPlaying ? 1000 : null
  );
  return (
    <>
      {pathname === "Song" || pathname === "Studio" ? (
        <></>
      ) : (
        <>
          <div className="playbar-padding" />
          <div className="playbar-wrapper">
            <div className="playbar">
              <div className="playbar-playlist">
                <FontAwesomeIcon icon="bars" />
              </div>
              <Link to="/song" className="playbar-songinfo">
                <p className="playbar-title">나의 어깨에 기대어요 {cnt}</p>
                <p className="playbar-member">sung.minner, ajsdfl1232</p>
              </Link>
              <div className="playbar-control">
                <FontAwesomeIcon
                  icon="step-backward"
                  className="playbar-prev"
                />
                {isPlaying ? (
                  <FontAwesomeIcon
                    icon="pause"
                    onClick={toggleStatus}
                    className="playbar-pause"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="play"
                    onClick={toggleStatus}
                    className="playbar-play"
                  />
                )}
                <FontAwesomeIcon icon="step-forward" className="playbar-next" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Playbar;
