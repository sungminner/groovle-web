import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const AppRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song" element={<Song />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/studio/recorder" element={Recorder} />
        {/* element={...}로 넣는 건 불러올 컴포넌트가 class 형태일 때 거기에 props를 넘겨주기 위해 사용.
        호출할 화면에서 Link를 통해 props 넘겨줄 수 있음 */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create" element={<Create />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
