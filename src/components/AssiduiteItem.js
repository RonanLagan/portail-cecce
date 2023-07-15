import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AssiduiteItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.descContainer}>
        <Text style={styles.desc}>{item.Description}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.date}>{item.EventDate}</Text>
        <Text>
          {item.FromTime} à {item.ToTime}
        </Text>
      </View>
      <Text>{item.CourseTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10
  },
  descContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  desc: {
    fontWeight: "bold",
    fontSize: 13,
  },
  date: {
    fontWeight: "bold",
    marginRight: 10,
  },
  time: {
    display: "flex",
    flexDirection: "row",
  },
});
