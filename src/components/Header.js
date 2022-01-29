import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "css/header.css";
import logo from "img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ currentPage }) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {currentPage === "Home" ||
      currentPage === "Explore" ||
      currentPage === "My" ? (
        <nav className="header">
          <div className="header-item">
            <img
              src={logo}
              alt="logo"
              className="header-logo"
              onClick={goHome}
            />
          </div>
          <div className="header-item">
            <p className="header-title">{currentPage}</p>
          </div>
          <div className="header-item">
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
          </div>
        </nav>
      ) : (
        <nav className="header">
          <div className="header-item">
            <FontAwesomeIcon
              icon="chevron-left"
              className="header-goback"
              onClick={goBack}
            />
          </div>
          <div className="header-item">
            <p className="header-title">{currentPage}</p>
          </div>
          <div className="header-item"></div>
        </nav>
      )}
    </>
  );
};

export default Header;
