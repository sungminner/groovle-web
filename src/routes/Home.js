import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "css/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import Navigation from "components/Navigation";
import HomePost from "components/HomePost";
import axios from "axios";

const Home = () => {
  const [res, setRes] = useState("");
  useEffect(async () => {
    await axios.get("http://localhost:4000/api/show").then((response) => {
      setRes(response.data);
      console.log(response.data);
    });
  });
  const onClick = async () => {
    await axios.post("http://localhost:4000/api/test", {
      testtext: "hello222",
      headers: {
        "content-type": "application/json",
      },
    });
  };
  return (
    <>
      <Header />
      <HomePost />
      <button onClick={onClick}>test</button>
      <p>{res}</p>
      <Navigation />
    </>
  );
};

export default Home;
