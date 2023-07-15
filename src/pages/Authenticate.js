import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

import QrCode from "../components/QrCode";

export default function Authenticate({ saveCookie }) {
  const height = Dimensions.get("screen").height;

  const [qrOpen, setQrOpen] = useState(false);
  const [data, setData] = useState("");
  const handleData = (data) => {
    saveCookie(data);
  };

  const closeQr = () => {
    setQrOpen(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}
      >
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>
            Bienvenu au Portail-Élève Mobile
          </Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.biggerText}>Instructions pour se connecter</Text>
        </View>
        <View style={styles.disclaimer}>
          <Text>Note: Fonctionne seulement pour les 9em et plus</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.bold}>1. </Text>
          <Text style={styles.text}>
            ouvrez Google Chrome sur un ordinateur et accédez au "Chrome web
            store"
          </Text>
        </View>
        <View style={{ height: height * 0.3, marginTop: 10 }}>
          <Image
            style={styles.image}
            source={require("../../assets/instructions1.png")}
          />
        </View>
        <View style={styles.inline}>
          <Text style={styles.bold}>2. </Text>
          <Text style={styles.text}>
            recherchez "Portail Élève Mobile Login" et téléchargez l'extension
          </Text>
        </View>
        <View style={{ height: height * 0.3, marginTop: 10 }}>
          <Image
            style={styles.image}
            source={require("../../assets/instructions2.png")}
          />
        </View>
        <View style={styles.inline}>
          <Text style={styles.bold}>3. </Text>
          <Text style={styles.text}>
            Ouvrez votre Portail Élève (sur l'ordinateur) et sélectionner le
            bouton "Qr"
          </Text>
        </View>
        <View style={{ height: height * 0.3, marginTop: 10 }}>
          <Image
            style={styles.image}
            source={require("../../assets/instructions3.png")}
          />
        </View>
        <View style={styles.lastinline}>
          <Text style={styles.bold}>4. </Text>
          <Text style={styles.text}>
            Appuyer sur le bouton "Scannez" et scan le code QR
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btn}
        onPress={() => {
          setQrOpen(true);
        }}
      >
        <Text style={styles.btnText}>Scannez</Text>
      </TouchableOpacity>
      {(() => {
        if (qrOpen) {
          return <QrCode closeQr={closeQr} handleData={handleData} />;
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#a0d8ef",
    padding: 20,
  },
  btn: {
    backgroundColor: "#ff6666",
    padding: 20,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollview: {
    marginBottom: 20,
    flex: 1,
    display: "flex",
  },
  welcomeView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  biggerText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: "#444",
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  lastinline: { display: "flex", flexDirection: "row", marginTop: 20, marginBottom: 40 },
  disclaimer: {
    padding: 10,
    backgroundColor: "#ff4444",
    borderRadius: 10
  }
});
