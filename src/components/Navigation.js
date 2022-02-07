import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePathname from "functions/usePathname";
import "css/navigation.css";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "Song" || pathname === "Studio" ? (
        <></>
      ) : (
        <>
          <div className="nav__padding" />
          <div className="nav__wrapper">
            <nav className="nav">
              <div className="nav__link">
                <Link to="/explore">
                  <FontAwesomeIcon
                    icon="globe-americas"
                    className="nav__link-icon"
                  />
                  <p className="nav__link-detail enReg">Explore</p>
                </Link>
              </div>
              <div className="nav__link">
                <Link to="/">
                  <FontAwesomeIcon icon="home" className="nav__link-icon" />
                  <p className="nav__link-detail enReg">Home</p>
                </Link>
              </div>
              <div className="nav__link">
                {/* {userObj ? ( */}
                <Link to="/my">
                  <FontAwesomeIcon icon="user" className="nav__link-icon" />
                  <p className="nav__link-detail enReg">My</p>
                </Link>
                {/* ) : (
            <Link to="/auth">
              <FontAwesomeIcon icon="user" className="nav__link-icon" />
              <p className="nav__link-detail">My</p>
            </Link>
          )} */}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
