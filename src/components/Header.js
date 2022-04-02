import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePathname from "functions/usePathname";
import logo from "img/logo192.png";
import "css/header.css";

const Header = () => {
  const navigate = useNavigate();
  const pathname = usePathname();
  const goHome = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {(pathname === "Home" || pathname === "Explore") && (
        <>
          <div className="header-padding" />
          <div className="header-wrapper">
            <nav className="header">
              <div className="header-pagename">
                <img
                  src={logo}
                  alt="logo"
                  className="header-logo"
                  onClick={goHome}
                />
                <p className="header-title">{pathname}</p>
              </div>
              <div className="header-menu">
                <Link to="/search">
                  <FontAwesomeIcon icon="search" className="header-menu-link" />
                </Link>
                <Link to="/notifications">
                  <FontAwesomeIcon icon="bell" className="header-menu-link" />
                </Link>
                <Link to="/friends">
                  <FontAwesomeIcon icon="users" className="header-menu-link" />
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
      {pathname === "Profile" && (
        <>
          <div className="header-padding" />
          <div className="header-wrapper">
            <nav className="header">
              <div className="header-pagename">
                <img
                  src={logo}
                  alt="logo"
                  className="header-logo"
                  onClick={goHome}
                />
                <p className="header-title">{pathname}</p>
              </div>
              <div className="header-menu">
                <Link to="/notifications">
                  <FontAwesomeIcon icon="bell" className="header-menu-link" />
                </Link>
                <Link to="/settings">
                  <FontAwesomeIcon icon="gear" className="header-menu-link" />
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
      {(pathname === "Song" || pathname === "Studio") && (
        <>
          <div className="header-padding" />
          <div className="header-wrapper">
            <nav className="header">
              <div className="header-pagename">
                <FontAwesomeIcon
                  icon="chevron-left"
                  className="header-goback"
                  onClick={goBack}
                />
                <p className="header-title">{pathname}</p>
              </div>
              <div className="header-menu">
                <FontAwesomeIcon
                  icon="external-link-alt"
                  className="header-menu-link"
                />
                <FontAwesomeIcon icon="bars" className="header-menu-link" />
              </div>
            </nav>
          </div>
        </>
      )}
      {(pathname === "Friends" ||
        pathname === "Notifications" ||
        pathname === "Search" ||
        pathname === "Settings" ||
        pathname === "Create" ||
        pathname === "Recorder" ||
        pathname === "Editor" ||
        pathname === "Synthesize" ||
        pathname === "Storage" ||
        pathname === "Playlist") && (
        <>
          <div className="header-padding" />
          <div className="header-wrapper">
            <nav className="header">
              <div className="header-pagename">
                <FontAwesomeIcon
                  icon="chevron-left"
                  className="header-goback"
                  onClick={goBack}
                />
                <p className="header-title">{pathname}</p>
              </div>
              <div className="header-menu"></div>
            </nav>
          </div>
        </>
      )}
      {(pathname === "Login" || pathname === "Signup") && (
        <>
          <div className="header-padding" />
          <div className="header-wrapper">
            <nav className="header">
              <div className="header-pagename">
                <FontAwesomeIcon
                  icon="xmark"
                  className="header-goback"
                  onClick={goBack}
                />
                <p className="header-title">{pathname}</p>
              </div>
              <div className="header-menu"></div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
