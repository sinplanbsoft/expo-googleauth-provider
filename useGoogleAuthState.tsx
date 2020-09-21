import React from "react";

import { GoogleAuthContext } from "./GoogleAuthProvider";
import { AuthStatus, GoogleAuthHookState } from "./data/auth/types";

const useGoogleAuthState = (): GoogleAuthHookState => {
  const {
    status,
    user,
    authError,
    signInWithGoogle,
    signOutGoogle,
  } = React.useContext(GoogleAuthContext);

  const isPending = status === AuthStatus.idle || status === AuthStatus.pending;
  const isError = !!authError;
  const isAuthenticated = status === AuthStatus.authenticated;

  return {
    user,
    isPending,
    isError,
    isAuthenticated,
    onSignInWithGoogle: signInWithGoogle,
    onSignOutGoogle: signOutGoogle,
  };
};

export default useGoogleAuthState;
