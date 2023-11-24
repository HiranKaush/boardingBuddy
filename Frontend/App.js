import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { UserContext } from "./UserContext";

import Navigator from "./navigators/Navigator";

export default function App() {
  
  return (
    <>
      <UserContext>
        <Navigator/>
      </UserContext>
    </>
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
