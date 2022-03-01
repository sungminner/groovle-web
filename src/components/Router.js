import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Playbar from "components/Playbar";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Recorder from "routes/Recorder";
import Profile from "routes/Profile";
import Settings from "routes/Settings";
import Search from "routes/Search";
import Song from "routes/Song";
import Create from "routes/Create";
import Explore from "routes/Explore";
import Notifications from "routes/Notifications";
import Friends from "routes/Friends";
import Studio from "routes/Studio";
import Storage from "routes/Storage";
import Playlist from "routes/Playlist";
import Login from "routes/Login";
import Signup from "routes/Signup";
import Welcome from "routes/Welcome";

const AppRouter = ({
  userObj,
  userReady,
  refreshUser,
  playlist,
  setPlaylist,
}) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home setPlaylist={setPlaylist} />} />
        <Route path="/song/:randomKey" element={<Song />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/recorder" element={<Recorder />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/settings"
          element={<Settings refreshUser={refreshUser} />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create" element={<Create />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/playlist" element={<Playlist playlist={playlist} />} />
        <Route path="/login" element={<Login refreshUser={refreshUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome userObj={userObj} />} />
      </Routes>
      <Playbar playlist={playlist} />
      <Navigation />
    </BrowserRouter>
  );
};

export default AppRouter;
