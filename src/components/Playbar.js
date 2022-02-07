import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePathname from "functions/usePathname";
import "css/playbar.css";

const Playbar = () => {
  const pathname = usePathname();
  const [cnt, setCnt] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCnt(cnt + 1);
    }, 1000);
    return () => clearInterval(timer);
  });
  return (
    <>
      {pathname === "Song" || pathname === "Studio" ? (
        <></>
      ) : (
        <>
          <div className="playbar-padding" />
          <Link to="/song">
            <div className="playbar-wrapper">
              <div className="playbar">
                <div className="playbar-playlist">
                  <FontAwesomeIcon icon="bars" />
                </div>
                <div className="playbar-songinfo">
                  <p className="playbar-title">나의 어깨에 기대어요 {cnt}</p>
                  <p className="playbar-member">sung.minner, ajsdfl1232</p>
                </div>
                <div className="playbar-control">
                  <FontAwesomeIcon
                    icon="step-backward"
                    className="playbar-prev"
                  />
                  <FontAwesomeIcon icon="play" className="playbar-play" />
                  <FontAwesomeIcon
                    icon="step-forward"
                    className="playbar-next"
                  />
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default Playbar;
