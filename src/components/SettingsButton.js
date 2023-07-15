import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SettingsButton({activate, name, active}) {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => {
          activate(name)
      }}>
        <AntDesign name="setting" size={24} color={active ? "white" : "black"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#79b6ef",
    paddingHorizontal: 10,
    borderRightColor: "white",
    borderRightWidth: 1,
  },
});
