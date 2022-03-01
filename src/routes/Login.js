import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "components/GoogleLoginButton";
import base_URL from "base_URL";
import "css/login.css";

const Login = ({ refreshUser }) => {
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
            navigate("/");
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
