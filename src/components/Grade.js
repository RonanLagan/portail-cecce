import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Grade({ grade, viewGrade }) {
    const vg = () => {
        viewGrade(grade)
    }
    let moyenne = grade.Moyenne;
    if (moyenne == "") {
      moyenne = "--"
    }

  return (
    <View style={styles.container}>
      <View style={styles.className}>
        <Text style={styles.classNameText}>
          {grade.Matiere} {"     "} {grade.Classe}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.gradeContainer} onPress={vg}>
          <Text style={styles.gradeText}>{moyenne}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 15,
  },
  className: {
    padding: 10,
    backgroundColor: "#777",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    display: "flex",
    flexDirection: "row",
  },
  classNameText: {
    color: "#fff",
  },
  gradeContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
  },
  gradeText: {
      fontWeight: "bold",
      fontSize: 15,
      borderBottomColor: "#000",
      borderBottomWidth: 1
  }
});
