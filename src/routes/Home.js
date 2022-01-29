import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/home.css";
import Header from "components/Header";
import Navigation from "components/Navigation";
import HomePost from "components/HomePost";
import axios from "axios";

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
      <Navigation />
    </>
  );
};

export default Home;
