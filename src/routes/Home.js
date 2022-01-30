import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Header from "components/Header";
import Playbar from "components/Playbar";
import Navigation from "components/Navigation";
import CreateButton from "components/CreateButton";
import HomePost from "components/HomePost";
import "css/home.css";

const Home = () => {
  const [res, setRes] = useState("");
  const [data, setData] = useState("");
  const getData = async () => {
    await axios.get("http://localhost:4000/api/show").then((response) => {
      setRes(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setData(value); // 입력받을 때 동시에 int로 바꾸면 null일 때 오류
  };
  const onClick = async () => {
    await axios.post("http://localhost:4000/api/test", {
      testtext: data,
      headers: {
        "content-type": "application/json",
      },
    });
    setData("");
    getData();
  };
  return (
    <>
      <Header currentPage="Home" />
      <HomePost />
      <HomePost />
      <HomePost />
      <input type="text" value={data} onChange={onChange} />
      <input type="submit" value="save" onClick={onClick} />
      <p>last data: {res}</p>
      <CreateButton />
      <Playbar />
      <Navigation />
    </>
  );
};

export default Home;
