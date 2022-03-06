import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";
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

const AppRouter = ({ userObj, refreshUser, playlist, setPlaylist }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={
            <PublicRoute userObj={userObj} restricted={false}>
              <Home setPlaylist={setPlaylist} />
            </PublicRoute>
          }
        />
        <Route
          path="/song/:randomKey"
          element={
            <PublicRoute userObj={userObj} restricted={false}>
              <Song />
            </PublicRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PublicRoute userObj={userObj} restricted={false}>
              <Explore />
            </PublicRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <PublicRoute userObj={userObj} restricted={false}>
              <Playlist playlist={playlist} />
            </PublicRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PublicRoute userObj={userObj} restricted={false}>
              <Search />
            </PublicRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PublicRoute userObj={userObj} restricted={false}>
              <Create />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute userObj={userObj} restricted={true}>
              <Login userObj={userObj} refreshUser={refreshUser} />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute userObj={userObj} restricted={true}>
              <Signup />
            </PublicRoute>
          }
        />
        {/* private routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute userObj={userObj}>
              <Profile userObj={userObj} />
            </PrivateRoute>
          }
        />
        <Route
          path="/studio/:randomKey"
          element={
            <PrivateRoute userObj={userObj}>
              <Studio />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute userObj={userObj}>
              <Settings refreshUser={refreshUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/storage"
          element={
            <PrivateRoute userObj={userObj}>
              <Storage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute userObj={userObj}>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <PrivateRoute userObj={userObj}>
              <Friends />
            </PrivateRoute>
          }
        />
        <Route path="/welcome" element={<Welcome userObj={userObj} />} />
        <Route path="/recorder" element={<Recorder />} />
      </Routes>
      <Playbar playlist={playlist} />
      <Navigation />
    </BrowserRouter>
  );
};

export default AppRouter;
