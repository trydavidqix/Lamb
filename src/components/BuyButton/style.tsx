import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    overflow: "hidden",
    marginVertical: 10,
    shadowColor: "#01a6b3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 12,
    backgroundColor: "rgba(1, 166, 179, 0.1)",
  },
  button: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  icon: {
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
