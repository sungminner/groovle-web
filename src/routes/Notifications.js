import React from "react";
import "css/notifications.css";
import Header from "components/Header";
import Navigation from "components/Navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <div>
      <Header currentPage="Notifications" />
      <p>Today</p>
      <p>sung.minner followed me</p>
      <p>sung.minner joined!</p>
      <p>This Month</p>
      <p>sung.minner followed me</p>
      <p>sung.minner joined!</p>
      <Navigation />
    </div>
  );
};

export default Notifications;
