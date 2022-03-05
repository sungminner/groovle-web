import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children, userObj, restricted }) => {
  const location = useLocation();
  if (userObj && restricted) {
    // Redirect them to the root page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  } else {
    return children;
  }
};

export default PublicRoute;
