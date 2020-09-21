import React from "react";
import { Button, Text, View } from "react-native";

import useGoogleAuthState from "expo-googleauth-provider/useGoogleAuthState";

const Home = (): React.ReactElement => {
  const { user, onSignOutGoogle } = useGoogleAuthState();

  return (
    <View>
      <Button title="Logout" onPress={onSignOutGoogle} />
      <Text>{`hello ${user?.name}`}</Text>
    </View>
  );
};

export default Home;
