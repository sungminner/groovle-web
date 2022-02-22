import React from "react";
import GoogleLoginButton from "components/GoogleLoginButton";

const Login = () => {
  const onGoogleLogin = (googleId) => {
    console.log(googleId);
  };
  return (
    <>
      <GoogleLoginButton onGoogleLogin={onGoogleLogin} />
    </>
  );
};

export default Login;
