import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AssiduiteItem from "../components/AssiduiteItem";

export default function Assiduite({ assiduite }) {
  return (
    <View style={styles.container}>
      {(() => {
        if (assiduite.length == 0) {
          return (
            <View style={styles.noAssiduite}>
              <Text style={styles.noAssiduiteTxt}>
                Aucune assiduité
              </Text>
            </View>
          );
        } else {
          return (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => {
                let k = item.ClassCode + item.EventDate + item.FromTime;
                return k;
              }}
              data={assiduite}
              renderItem={({ item }) => {
                return <AssiduiteItem item={item} />;
              }}
            />
          );
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noAssiduite: {
    backgroundColor: "#f5e79e",
    padding: 20,
    borderRadius: 10,
  },
  noAssiduiteTxt: {
    color: "#8a6d3b",
  },
});
