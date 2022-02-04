import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Playbar from "components/Playbar";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Recorder from "routes/Recorder";
import My from "routes/My";
import Settings from "routes/Settings";
import Search from "routes/Search";
import Song from "routes/Song";
import Create from "routes/Create";
import Explore from "routes/Explore";
import Notifications from "routes/Notifications";
import Friends from "routes/Friends";
import Studio from "routes/Studio";

const AppRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        {/* element={<... />}이면 함수, {...}이면 클래스 */}
        <Route path="/" element={<Home />} />
        <Route path="/song" element={<Song />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/studio/recorder" element={Recorder} />
        <Route path="/my" element={<My />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create" element={<Create />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
      <Playbar />
      <Navigation />
    </BrowserRouter>
  );
};

export default AppRouter;
