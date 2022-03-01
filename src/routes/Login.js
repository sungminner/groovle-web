import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "components/GoogleLoginButton";
import "css/login.css";

const Login = () => {
  const onGoogleLogin = (googleId) => {
    // console.log(googleId);
  };
  return (
    <>
      <div>
        <GoogleLoginButton onSuccess={onGoogleLogin} />
      </div>
      <div>
        <Link to="/signup">sign up</Link>
      </div>
    </>
  );
};

export default Login;
