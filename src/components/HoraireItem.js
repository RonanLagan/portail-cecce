import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HorairePeriode from "./HorairePeriode";

export default function HoraireItem({ horaire, viewPeriode }) {
  let day = horaire.Date.split("-")[2];
  return (
    <View style={styles.container}>
      <View style={styles.day}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
      <View style={styles.periods}>
        {horaire.Periodes.map((m) => {
          return <HorairePeriode viewPeriode={viewPeriode} key={m.Numero} periode={m} />;
        })}
        {(() => {
          if (horaire.Periodes.length == 0) {
            return (
              <View style={styles.conge}>
                <Text style={styles.congeText}>Congé</Text>
              </View>
            );
          }
        })()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  day: {
    backgroundColor: "#5599ff",
    padding: 3,
    borderRadius: 5,
    marginRight: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    color: "#fff",
    fontSize: 18,
  },
  periods: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  conge: {
      display: "flex",
      justifyContent: "center"
  },
  congeText: {
      color: "#5a5a5a"
  }
});
