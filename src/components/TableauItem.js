import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TableauItem({ item }) {
  const date = item.Date.split("-")[2];

  return (
    <View style={styles.container}>
      <View style={styles.DateContainer}>
        <Text style={styles.Date}>{date}</Text>
      </View>
      <Text>{item.Short}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  DateContainer: {
    backgroundColor: "#5599ff",
    padding: 3,
    borderRadius: 5,
    marginRight: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Date: {
    color: "#fff",
    fontSize: 18,
  },
});
