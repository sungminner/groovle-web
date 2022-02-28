import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "components/GoogleLoginButton";
import base_URL from "base_URL";
import "css/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const onGoogleSignup = async (response) => {
    try {
      await axios
        .post(`${base_URL}/api/createuser`, {
          tokenId: response.tokenId,
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data) {
            window.localStorage.setItem("id", res.data.id);
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
        <GoogleLoginButton onSuccess={onGoogleSignup} />
      </div>
      <br />
      <div>
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
