import React from "react";
import { View, Button, Text } from "react-native";

import useGoogleAuthState from "expo-googleauth-provider/useGoogleAuthState";

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

export default Login;
