import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chargement en cours</Text>
      <Image style={styles.img} source={require("../../assets/icons/adaptive-icon.png")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a0d8ef",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  img: {
      width: 128,
      height: 128
  }
});
