import React from "react";
// import { Link, useHistory } from "react-router-dom";
import Header from "components/Header";
import Navigation from "components/Navigation";

const Profile = () => {
  return (
    <>
      <Header currentPage="My" />
      <p>profile</p>
      <p>프사</p>
      <p>정성민</p>
      <p>기타 키보드</p>
      <p>메뉴 목록</p>
      <p>재생목록</p>
      <Navigation />
    </>
  );
};

export default Profile;
