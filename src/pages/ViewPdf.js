import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { AntDesign } from "@expo/vector-icons";

export default function ViewPdf({ viewing, setViewingPdf, cookies }) {
  let parsedCookies = ""
  JSON.parse(cookies).forEach(c => {
    let cookie = `${c.name}=${c.value};`
    parsedCookies += cookie
  })

  const source = {
    uri: viewing,
    headers: {
      Cookie: parsedCookies,
      Host: "app3.ecolecatholique.ca",
      origin: "https://app3.ecolecatholique.ca",
      Referer:
        "https://app3.ecolecatholique.ca/sp/parent/portail_parent/main.htm",
    },
  };

  const closePdf = () => {
    setViewingPdf("")
  }

  return (
    <View style={styles.container}>
      <PDFReader source={source} />
      <TouchableOpacity activeOpacity={0.75} style={styles.close} onPress={closePdf}>
        <View style={styles.innerClose}>
          <AntDesign name="closecircleo" size={24} color="red" />
          <Text style={styles.closeText}>Fermer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "hidden",
    borderRadius: 10,
  },
  close: {
    position: "absolute",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    margin: 5,
    right: 0,
    borderColor: "black",
    borderWidth: 1,
  },
  innerClose: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  closeText: {
    marginLeft: 3
  }
});
