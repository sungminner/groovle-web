import React from "react";
import { Link } from "react-router-dom";
import "css/header.css";
import logo from "img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <>
      <nav className="header">
        <div className="header__logo-wrapper">
          <Link to="/">
            <img src={logo} alt="logo" className="header__logo" />
          </Link>
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
    </>
  );
};

export default Header;
