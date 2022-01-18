import React from "react";
import { Link } from "react-router-dom";
import "css/navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => {
  return (
    <>
      <div className="c-nav__wrapper">
        <nav className="c-nav">
          <div className="c-nav__link">
            <Link to="/explore">
              <FontAwesomeIcon
                icon="globe-americas"
                className="c-nav__link-icon"
              />
              <p className="c-nav__link-detail enReg">Explore</p>
            </Link>
          </div>
          <div className="c-nav__link">
            <Link to="/">
              <FontAwesomeIcon icon="home" className="c-nav__link-icon" />
              <p className="c-nav__link-detail enReg">Home</p>
            </Link>
          </div>
          <div className="c-nav__link">
            {/* {userObj ? ( */}
            <Link to="/profile">
              <FontAwesomeIcon icon="user" className="c-nav__link-icon" />
              <p className="c-nav__link-detail enReg">My</p>
            </Link>
            {/* ) : (
            <Link to="/auth">
              <FontAwesomeIcon icon="user" className="c-nav__link-icon" />
              <p className="c-nav__link-detail">My</p>
            </Link>
          )} */}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
