import React, { useEffect, useState, ReactNode, ReactElement } from 'react'
import { AsyncStorage } from 'react-native'
import { SplashScreen } from 'expo'
import * as Google from 'expo-google-app-auth'

import { AuthStatus, GoogleAuthState } from './data/auth/types'

type Props = {
  children: ReactNode
}

export const GoogleAuthContext = React.createContext<GoogleAuthState>({
  status: AuthStatus.idle,
  user: undefined,
  authError: undefined,
  signInWithGoogle: () => undefined,
  signOutGoogle: () => undefined,
})
const GoogleAuthProvider = ({ children }: Props): ReactElement => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.idle)
  const [user, setUser] = useState<Google.GoogleUser>()
  const [authError, setAuthError] = useState<string>()

  useEffect(() => {
    const getUserFromStorage = async () => {
      const userJSON = await AsyncStorage.getItem('user')
      if (userJSON) {
        const user = JSON.parse(userJSON) as Google.GoogleUser

        setUser(user)
        setStatus(AuthStatus.authenticated)
      } else {
        setStatus(AuthStatus.noAuthenticated)
      }

      SplashScreen.hide()
    }

    SplashScreen.preventAutoHide()
    setStatus(AuthStatus.pending)
    getUserFromStorage()
  }, [])

  const signInWithGoogle = async () => {
    setStatus(AuthStatus.pending)
    setAuthError(undefined)
    try {
      const result = await Google.logInAsync({
        clientId: process.env.REACT_APP_ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        await AsyncStorage.setItem('user', JSON.stringify(result.user))
        setUser(result.user)
        setStatus(AuthStatus.authenticated)
      } else {
        setStatus(AuthStatus.noAuthenticated)
      }
    } catch (e) {
      setStatus(AuthStatus.noAuthenticated)
      setAuthError(e.message)
    }
  }

  const signOutGoogle = async () => {
    setStatus(AuthStatus.pending)
    setAuthError(undefined)
    try {
      await AsyncStorage.removeItem('user')

      setUser(undefined)
      setStatus(AuthStatus.noAuthenticated)
    } catch (e) {
      setAuthError(e.message)
      setStatus(AuthStatus.authenticated)
    }
  }

  return (
    <GoogleAuthContext.Provider
      value={{ status, user, authError, signInWithGoogle, signOutGoogle }}
    >
      {children}
    </GoogleAuthContext.Provider>
  )
}

export default GoogleAuthProvider
