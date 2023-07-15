import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import NavButton from "./components/NavButton";
import SettingsButton from "./components/SettingsButton";

export default function Navigation({ setPage }) {
  const [buttons, setButtons] = useState([
    { name: "Tableau de bord", active: true, page: "Tableau", key: "1" },
    { name: "Horaire", active: false, page: "Horaire", key: "2" },
    { name: "Résultats scolaires", active: false, page: "Resultats", key: "3" },
    { name: "Assiduité", active: false, page: "Assiduite", key: "4" },
    { name: "Settings", active: false, page: "Settings", key: "5" },
  ]);

  const activate = (name) => {
    let btns = buttons;
    for (let i = 0; i < btns.length; i++) {
      btns[i].active = false;
    }
    btns.find((n) => n.name == name).active = true;
    setButtons([...btns]);
    let page = btns.find((n) => n.name == name).page;
    setPage(page);
  };

  return (
    <View style={styles.navigation}>
      <SettingsButton
        activate={activate}
        name="Settings"
        active={buttons.find((b) => b.name == "Settings").active}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainerStyle}
        data={buttons}
        extraData={buttons}
        renderItem={({ item }) => {
          if (item.name != "Settings") {
            return (
              <NavButton
                name={item.name}
                active={item.active}
                activate={activate}
              />
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    display: "flex",
    flexDirection: "row",
  },
  flatList: {
    flex: 1,
    backgroundColor: "#79b6ef",
  },
  flatListContainerStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
