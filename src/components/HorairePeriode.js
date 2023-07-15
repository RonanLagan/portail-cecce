import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export default function HorairePeriode({ periode, viewPeriode }) {
  let [isPressed, setIsPressed] = useState(false);

  const setPress = () => {
    setIsPressed(true);
  };

  const delPress = () => {
    setIsPressed(false);
  };

  const viewThisPeriode = () => {
    if (periode.Classe != null) {
      viewPeriode(periode);
    }
  };

  return (
    <TouchableHighlight
      underlayColor="white"
      style={styles.container}
      onShowUnderlay={setPress}
      onHideUnderlay={delPress}
      onPress={viewThisPeriode}
    >
      {(() => {
        if (periode.Classe == null) {
          return (
            <Text style={styles.textStyle}>
              Période libre
            </Text>
          );
        } else {
          return (
            <Text style={isPressed ? styles.pressedText : styles.textStyle}>
              {periode.CodeCours}
            </Text>
          );
        }
      })()}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 1,
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 10,
    color: "black",
  },
  pressedText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
  },
});
