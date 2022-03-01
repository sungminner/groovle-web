import React from "react";
import GoogleLogoutButton from "components/GoogleLogoutButton";
import "css/settings.css";

const Settings = ({ refreshUser }) => {
  return (
    <>
      <p>Settings</p>
      <GoogleLogoutButton refreshUser={refreshUser} />
    </>
  );
};

export default Settings;
