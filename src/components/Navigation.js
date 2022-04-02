import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePathname from "functions/usePathname";
import "css/navigation.css";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "Song" ||
      pathname === "Studio" ||
      pathname === "Recorder" ||
      pathname === "Editor" ||
      pathname === "Login" ||
      pathname === "Signup" ||
      pathname === "Welcome" ? (
        <></>
      ) : (
        <>
          <div className="nav-padding" />
          <div className="nav-wrapper">
            <nav className="nav">
              <div className="nav-link">
                <Link to="/explore">
                  <FontAwesomeIcon
                    icon="globe-americas"
                    className="nav-link-icon"
                  />
                  <p className="nav-link-detail enReg">Explore</p>
                </Link>
              </div>
              <div className="nav-link">
                <Link to="/">
                  <FontAwesomeIcon icon="home" className="nav-link-icon" />
                  <p className="nav-link-detail enReg">Home</p>
                </Link>
              </div>
              <div className="nav-link">
                {/* {userObj ? ( */}
                <Link to="/profile">
                  <FontAwesomeIcon icon="user" className="nav-link-icon" />
                  <p className="nav-link-detail enReg">My</p>
                </Link>
                {/* ) : (
            <Link to="/auth">
              <FontAwesomeIcon icon="user" className="nav-link-icon" />
              <p className="nav-link-detail">My</p>
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
