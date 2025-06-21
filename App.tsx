import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GarageScreen from "./src/screens/GarageSreen";

export default function App() {
  return (
    <LinearGradient colors={["#121212", "#000"]} style={styles.container}>
      <GarageScreen />
      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
