import React, { useEffect, useState } from "react";
import axios from "axios";
import AppRouter from "components/Router";
import { useGoogleLogout } from "react-google-login";
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
  const [playlist, setPlaylist] = useState([]);
  const { signOut, loaded } = useGoogleLogout({
    clientId: process.env.REACT_APP_GCP_CLIENT_ID,
    onLogoutSuccess: () => {
      refreshUser();
      window.localStorage.clear();
    },
    onFailure: () => {
      // console.log("hook logout fail");
    },
  });
  const getUserObj = async (id) => {
    await axios.get(`${base_URL}/api/userbyid/${id}`).then((response) => {
      if (response.data) {
        //id값에 해당하는 user가 있을 때
        setUserObj(response.data);
        console.log(response.data);
      }
    });
  };
  useEffect(() => {
    if (window.localStorage.getItem("id") !== null) {
      // localStorage에 id값이 저장되어 있을 때
      const id = window.localStorage.getItem("id");
      getUserObj(id);
    } else {
      // localStorage에 id값이 저장되어 있지 않을 때 googleLoginButton에서 로그아웃
      if (loaded) {
        signOut();
      }
    }
    setInit(true);
  }, [loaded]);
  const refreshUser = async () => {
    console.log("before refresh", userObj);
    const id = window.localStorage.getItem("id");
    if (id) {
      await axios.get(`${base_URL}/api/userbyid/${id}`).then((response) => {
        if (response.data) {
          //id값에 해당하는 user가 있을 때
          setUserObj(response.data);
        }
      });
    } else {
      setUserObj(null);
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
