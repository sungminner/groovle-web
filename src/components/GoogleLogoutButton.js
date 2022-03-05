import { GoogleLogout } from "react-google-login";

const GoogleLogoutButton = ({ refreshUser }) => {
  const clientId = process.env.REACT_APP_GCP_CLIENT_ID;
  const onLogoutSuccess = () => {
    refreshUser();
    window.localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      ></GoogleLogout>
    </>
  );
};

export default GoogleLogoutButton;
