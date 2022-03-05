import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "components/GoogleLoginButton";
import base_URL from "base_URL";
import "css/login.css";

const Login = ({ refreshUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onGoogleLogin = async (response) => {
    try {
      await axios
        .post(`${base_URL}/api/login`, {
          tokenId: response.tokenId,
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data) {
            window.localStorage.setItem("id", res.data.id);
            refreshUser();
            navigate(location.state.from);
          }
        });
    } catch (e) {
      throw e;
    }
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
