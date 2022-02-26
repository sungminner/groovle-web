import React from "react";
import GoogleLogin from "react-google-login";

const GoogleLoginButton = ({ onGoogleLogin }) => {
  const clientId = process.env.REACT_APP_GCP_CLIENT_ID;
  const onSuccess = async (response) => {
    await onGoogleLogin(response.googleId);
  };
  const onFailure = (error) => {
    // console.log(error);
  };
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Google 계정 연결"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
