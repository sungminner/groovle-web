import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import usePathname from "functions/usePathname";
import useInterval from "functions/useInterval";
import base_URL from "base_URL";
import "css/playbar.css";

const Playbar = ({ playlist }) => {
  const pathname = usePathname();

  const [songObj, setSongObj] = useState();
  const getSong = async (songID) => {
    await axios.get(`${base_URL}/api/songbyid/${songID}`).then((response) => {
      setSongObj(response.data);
    });
  };
  useEffect(() => {
    if (playlist.length !== 0) {
      getSong(playlist[0]);
    }
  }, [playlist]);

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
              <Link to="/playlist" className="playbar-playlist">
                <FontAwesomeIcon icon="bars" />
              </Link>
              <Link
                to={songObj ? `/song/${songObj.randomKey}` : "/"}
                className="playbar-songinfo"
              >
                <p className="playbar-title">
                  {songObj ? songObj.title : "곡을 선택하세요."} {cnt}
                </p>
                <p className="playbar-member">
                  {songObj ? songObj.artist : "참가자"}
                </p>
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
