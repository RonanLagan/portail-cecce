import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Settings({ logout }) {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btnTxt}>Déconnexion</Text>
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#ff6666",
    padding: 15,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  btnTxt: {
      color: "#fff",
      fontSize: 16
  }
});
