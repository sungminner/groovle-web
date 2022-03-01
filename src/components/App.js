import React, { useEffect, useState } from "react";
import axios from "axios";
import AppRouter from "components/Router";
import Loading from "routes/Loading";
import base_URL from "base_URL";
import "css/reset.css";
import "css/app.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faBell,
  faChevronLeft,
  faCommentDots,
  faCrown,
  faEnvelope,
  faExternalLinkAlt,
  faFolder,
  faGear,
  faGlobeAmericas,
  faHeadset,
  faHeart,
  faHome,
  faImages,
  faPause,
  faPlay,
  faPlus,
  faRedoAlt,
  faSearch,
  faStepBackward,
  faStepForward,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faBell,
  faChevronLeft,
  faCommentDots,
  faCrown,
  faEnvelope,
  faExternalLinkAlt,
  faFolder,
  faGear,
  faGlobeAmericas,
  faHeadset,
  faHeart,
  faHome,
  faImages,
  faPause,
  faPlay,
  faPlus,
  faRedoAlt,
  faSearch,
  faStepBackward,
  faStepForward,
  faUser,
  faUsers,
  faXmark
);

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const getUserObj = async (id) => {
    await axios.get(`${base_URL}/api/userbyid/${id}`).then((response) => {
      if (response.data) {
        //id값에 해당하는 user가 있을 때
        setUserObj(response.data);
        if (response.data.name && response.data.username) {
          setUserReady(true);
        }
        console.log(response.data);
      }
    });
  };
  useEffect(() => {
    console.log(userObj, userReady);
  }, [userObj, userReady]);
  useEffect(() => {
    if (window.localStorage.getItem("id") !== null) {
      // localStorage에 id값이 저장되어 있을 때
      const id = window.localStorage.getItem("id");
      getUserObj(id);
    }
    setInit(true);
  }, []);
  const refreshUser = async () => {
    console.log("before refresh", userObj);
    const id = window.localStorage.getItem("id");
    if (id) {
      await axios.get(`${base_URL}/api/userbyid/${id}`).then((response) => {
        if (response.data) {
          //id값에 해당하는 user가 있을 때
          setUserObj(response.data);
          if (response.data.name && response.data.username) {
            setUserReady(true);
          } else {
            setUserReady(false);
          }
        }
      });
    } else {
      setUserObj(null);
      setUserReady(false);
    }
  };
  useEffect(() => {
    console.log("after refresh", userObj);
  }, [userObj]);
  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
          userReady={userReady}
          refreshUser={refreshUser}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
