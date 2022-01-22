import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "css/testshow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import Navigation from "components/Navigation";
import axios from "axios";
import useWindowDimensions from "functions/getWindowDimensions";

const Home = () => {
  const [res, setRes] = useState("");
  const { width, height } = useWindowDimensions();
  console.log(width * 0.8);
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
      <div
        className="testshow-post krReg"
        style={{
          width: width * 0.8,
          height: width * 0.8,
        }}
      >
        <Link to="/song">
          <img
            className="testshow-post__bgimg hpb-wide"
            src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
            alt="bgimg"
          />
          <div className="testshow-post__header">
            <img
              className="testshow-post__header-albumimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <div className="testshow-post__header-text">
              <p className="testshow-post__header-title krReg">
                사랑한다는 말로도 위로가 되지 않는
              </p>
              <p className="testshow-post__header-artist krReg">
                브로콜리너마저
              </p>
            </div>
            <img
              className="testshow-post__header-playbtn"
              src="https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-02-512.png"
              alt="playbtn"
            />
          </div>
          <div className="testshow-post__body">
            <img
              className="testshow-post__body-profileimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <p>sung.minner</p>
            <p>기타</p>
            <img
              className="testshow-post__body-profileimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <p>sfdsadfsadf</p>
            <p>키보드</p>
            <img
              className="testshow-post__body-profileimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <p>rewerw</p>
            <p>보컬</p>
          </div>
          <div className="testshow-post__footer">
            <p>LIKE 55</p>
            <p>REPLY 14</p>
          </div>
        </Link>
      </div>
      <div
        className="testshow-post krReg"
        style={{
          width: width * 0.8,
          height: width * 0.8,
        }}
      >
        <Link to="/song">
          <img
            className="testshow-post__bgimg"
            src="https://img.gadgethacks.com/img/10/71/63632332115374/0/take-long-exposure-photos-your-iphone.1280x600.jpg"
            alt="bgimg"
          />
          <div className="testshow-post__header">
            <img
              className="testshow-post__header-albumimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <div className="testshow-post__header-text">
              <p className="testshow-post__header-title krReg">
                사랑한다는 말로도 위로가 되지 않는
              </p>
              <p className="testshow-post__header-artist krReg">
                브로콜리너마저
              </p>
            </div>
            <img
              className="testshow-post__header-playbtn"
              src="https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-02-512.png"
              alt="playbtn"
            />
          </div>
          <div className="testshow-post__body">
            <img
              className="testshow-post__body-profileimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <p>sung.minner</p>
            <p>기타</p>
            <img
              className="testshow-post__body-profileimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <p>sfdsadfsadf</p>
            <p>키보드</p>
            <img
              className="testshow-post__body-profileimg"
              src="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg"
              alt="album"
            />
            <p>rewerw</p>
            <p>보컬</p>
          </div>
          <div className="testshow-post__footer">
            <p>LIKE 55</p>
            <p>REPLY 14</p>
          </div>
        </Link>
      </div>
      <button onClick={onClick}>test</button>

      <p>{res}</p>
      <Navigation />
    </>
  );
};

export default Home;
