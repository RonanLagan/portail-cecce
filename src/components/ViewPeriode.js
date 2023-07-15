import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";

export default function ViewPeriode({ periode, viewPeriode }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  let smallest = width;
  if (width > height) {
    smallest = height;
  }

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0)",
    },
    content: {
      width: smallest * 0.8,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      borderRadius: 15,
      padding: 5,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    titre: {
      color: "#31708f",
      fontWeight: "bold",
    },
    info: {
      color: "#31708f",
    },
    inline: {
      display: "flex",
      flexDirection: "row",
    },
  });

  if (periode.current == "null") {
    return <View></View>;
  } else {
    return (
      <Pressable
        style={styles.container}
        onPress={() => {
          viewPeriode({ current: "null" });
        }}
      >
        <View style={styles.content}>
          <Text style={styles.titre}>{periode.Titre}</Text>
          <Text style={styles.info}>Local {periode.NoSalle}</Text>
          <Text style={styles.info}>Classe {periode.Classe}</Text>
          <Text style={styles.info}>Période {periode.Numero}</Text>
          <Text style={styles.titre}>
            {periode.HeureDebut}-{periode.HeureFin}
          </Text>
          <Text></Text>
          <View style={styles.inline}>
            <Text style={styles.titre}>Enseigné par</Text>
            <Text style={styles.info}> {periode.Enseignant}</Text>
          </View>
          <Text style={styles.info}>{periode.CourrielEnseignant}</Text>
        </View>
      </Pressable>
    );
  }
}
