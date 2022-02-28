import React from "react";
import GoogleLogin from "react-google-login";

const GoogleLoginButton = ({ onSuccess }) => {
  const clientId = process.env.REACT_APP_GCP_CLIENT_ID;
  const onFailure = (error) => {
    // console.log(error);
  };
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Google 계정 연결"
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
