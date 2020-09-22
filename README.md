# expo-googleauth-provider

Easily add Google Authentication to an Expo app, you just need to inlcude the `GoogleAuthProvider` to the root of your app
and let the package do all the hard work for you.
This library provides use browser-based login only.

## Installation

```sh
$ npm install expo-googleauth-provider
```

## Usage

To use Google Sign In, you will need to create a project on the Google Developer Console and create an OAuth 2.0 client ID

- Go to the [Credentials Page](https://console.developers.google.com/apis/credentials)
- Create an app for your project if you haven't already.
- Once that's done, click "Create Credentials" and then "OAuth client ID." You will be prompted to set the product name on the consent screen, go ahead and do that.

The client ID provided must be set as an environment variable called **REACT_APP_ANDROID_CLIENT_ID**

To define environment variables I'd use [babel-plugin-inline-dotenv](https://github.com/brysgo/babel-plugin-inline-dotenv) as
it is done in the [example project](https://github.com/sinplanbsoft/expo-googleauth-provider/tree/master/example).

```javascript
export default function App() {
  return (
    <View style={styles.container}>
      <GoogleAuthProvider>
        <Main />
      </GoogleAuthProvider>
    </View>
  );
}
```

Every child component of `GoogleAuthProvider` will have access to the `useGoogleAuthState` hook.

```javascript
export type GoogleAuthHookState = {
  isPending: boolean // login process on going
  isError: boolean // there has been an error during the process
  isAuthenticated: boolean // the user is authenticated
  user?: Google.GoogleUser // google user information
  onSignInWithGoogle: () => void //method to start the login process
  onSignOutGoogle: () => void // method to start the logout process
}
```

```javascript
const Main = (): React.ReactElement => {
  const { isAuthenticated } = useGoogleAuthState();

  return isAuthenticated ? <Home /> : <Login />;
};
```

```javascript
const Login = (): React.ReactElement => {
  const { onSignInWithGoogle, isPending } = useGoogleAuthState();

  return (
    <View>
      {isPending ? (
        <Text>thinking</Text>
      ) : (
        <Button title="Google Login" onPress={onSignInWithGoogle} />
      )}
    </View>
  );
};
```

**expo-googleauth-provider** matains the user object on local storage once the login is completed sucessfully, meaning
the user will remain logged until the logout action is executed.
