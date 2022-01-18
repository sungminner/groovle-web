import React from "react";
import { Link } from "react-router-dom";
import "css/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import Navigation from "components/Navigation";

const Home = () => {
  return (
    <>
      <Header />
      <Link to="/song">
        <div className="c-home__song krReg">
          <p className="c-home__song-title krReg">
            사랑한다는 말로도 위로가 되지 않는
          </p>
          <p className="c-home__song-artist krReg">브로콜리너마저</p>
          <p className="c-home__song-host krReg">
            <FontAwesomeIcon icon="crown" className="c-home__song-crown" />{" "}
            기타왕
          </p>
        </div>
      </Link>
      <Link to="/song">
        <div className="c-home__song krReg">
          <p className="c-home__song-title krReg">
            사랑한다는 말로도 위로가 되지 않는
          </p>
          <p className="c-home__song-artist krReg">브로콜리너마저</p>
          <p className="c-home__song-host krReg">
            <FontAwesomeIcon icon="crown" className="c-home__song-crown" />{" "}
            기타왕
          </p>
        </div>
      </Link>
      <Navigation />
    </>
  );
};

export default Home;
