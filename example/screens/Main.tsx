import React from "react";

import Login from "./Login";
import Home from "./Home";

import useGoogleAuthState from "expo-googleauth-provider/useGoogleAuthState";

const Main = (): React.ReactElement => {
  const { isAuthenticated } = useGoogleAuthState();

  return isAuthenticated ? <Home /> : <Login />;
};

export default Main;
