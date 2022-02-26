import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import Loading from "routes/Loading";
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
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <>
      {init ? (
        <AppRouter playlist={playlist} setPlaylist={setPlaylist} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
