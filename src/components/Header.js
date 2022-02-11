import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePathname from "functions/usePathname";
import logo from "img/logo.png";
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
      {(pathname === "Home" || pathname === "Explore" || pathname === "My") && (
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
              <FontAwesomeIcon icon="search" className="header-menu__link" />
            </Link>
            <Link to="/notifications">
              <FontAwesomeIcon icon="bell" className="header-menu__link" />
            </Link>
            <Link to="/friends">
              <FontAwesomeIcon icon="users" className="header-menu__link" />
            </Link>
          </div>
        </nav>
      )}
      {(pathname === "Song" || pathname === "Studio") && (
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
              className="header-menu__link"
            />
            <FontAwesomeIcon icon="bars" className="header-menu__link" />
          </div>
        </nav>
      )}
      {(pathname === "Friends" ||
        pathname === "Notifications" ||
        pathname === "Search" ||
        pathname === "Settings" ||
        pathname === "Recorder" ||
        pathname === "Storage") && (
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
      )}
    </>
  );
};

export default Header;
