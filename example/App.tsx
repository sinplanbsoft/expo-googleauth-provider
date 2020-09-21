import React from "react";
import { StyleSheet, Text, View } from "react-native";

import GoogleAuthProvider from "expo-googleauth-provider/GoogleAuthProvider";

import Main from "./screens/Main";

export default function App() {
  return (
    <View style={styles.container}>
      <GoogleAuthProvider>
        <Main />
      </GoogleAuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
