import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function NavButton({ name, active, activate }) {
  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: active ? "#5a9eec" : "#f2f2f2",
      padding: 10,
      paddingHorizontal: 30,
      margin: 20,
      borderRadius: 15,
    },
    textStyle: {
        color: active ? "#fff" : "#000",
        fontWeight: "bold",
    }
  });

  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={styles.buttonStyle}
      onPress={() => {
          activate(name)
      }}
    >
      <Text style={styles.textStyle}>{name}</Text>
    </TouchableOpacity>
  );
}
