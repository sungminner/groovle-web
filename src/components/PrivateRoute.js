import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, userObj }) => {
  const location = useLocation();
  if (userObj) {
    return children;
  } else {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
};

export default PrivateRoute;
