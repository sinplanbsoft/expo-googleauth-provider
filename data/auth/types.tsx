import * as Google from 'expo-google-app-auth'

export enum AuthStatus {
  idle,
  pending,
  authenticated,
  noAuthenticated,
}

export type GoogleAuthState = {
  status: AuthStatus
  user?: Google.GoogleUser
  authError?: string
  signInWithGoogle: () => void
  signOutGoogle: () => void
}

export type GoogleAuthHookState = {
  isPending: boolean
  isError: boolean
  isAuthenticated: boolean
  user?: Google.GoogleUser
  onSignInWithGoogle: () => void
  onSignOutGoogle: () => void
}
