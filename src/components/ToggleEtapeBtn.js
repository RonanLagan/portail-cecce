import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ToggleEtapeBtn({
  viewingEtape,
  setViewingEtape,
  etape,
}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: viewingEtape == etape ? "#ff6666" : "#f2f2f2",
      borderRadius: 15,
      padding: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      marginRight: etape == 1 ? 10 : 0,
      marginLeft: etape == 2 ? 10 : 0,
    },
    text: {
      color: viewingEtape == etape ? "#fff" : "#000",
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  const toggleEtape = () => {
    setViewingEtape(etape);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.button}
      onPress={toggleEtape}
    >
      <Text style={styles.text}>Étape {etape}</Text>
    </TouchableOpacity>
  );
}
