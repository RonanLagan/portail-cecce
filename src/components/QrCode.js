import { BarCodeScanner } from "expo-barcode-scanner";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";

export default function QrCode({ closeQr, handleData }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  let boxSize = 0;
  if (width < height) {
    boxSize = width;
  } else {
    boxSize = height;
  }
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#a0d8ef",
    },
    cameraContainer: {
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      height: boxSize * 0.85,
      width: boxSize * 0.85,
      overflow: "hidden",
      borderRadius: 20,
      display: "flex",
    },
    scanner: {
      width: boxSize * 0.85,
      height: boxSize * 0.85,
    },
    closeCameraBtn: {
      width: boxSize * 0.85,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ff6666",
      borderRadius: 20,
      marginTop: 20,
      padding: 20,
    },
    closeCameraTxt: {
      color: "#fff",
      fontWeight: "bold",
    },
  });

  const [hasPermission, setHasPermission] = useState(null);

  const askPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  const handleQrScanned = ({ type, data }) => {
    try {
      let string = Buffer.from(data, "base64").toString();
      let parsed = JSON.parse(string);
      let valid = false;
      parsed.forEach((p) => {
        if (p.name == "ASP.NET_SessionId" || p.name == "sessionId") {
          valid = true;
        }
      });
      if (valid) {
        handleData(string);
        closeQr();
      }
    } catch {
      console.log("ERR");
    }
  };

  askPermission();

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {(() => {
          if (hasPermission) {
            return (
              <BarCodeScanner
                style={styles.scanner}
                onBarCodeScanned={(s) => {
                  handleQrScanned({ type: s.type, data: s.data });
                }}
              />
            );
          } else if (hasPermission == null) {
            return <Text>Chargement en cours</Text>;
          } else {
            return (
              <Text>
                autorisez l'application à utiliser l'appareil photo pour scanner
                le code QR
              </Text>
            );
          }
        })()}
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.closeCameraBtn}
        onPress={closeQr}
      >
        <Text style={styles.closeCameraTxt}>Fermez la caméra</Text>
      </TouchableOpacity>
    </View>
  );
}
