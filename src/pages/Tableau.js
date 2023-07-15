import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { stripHtml } from "string-strip-html";
import PortailReq from "../utils/PortailReq";
import TableauItem from "../components/TableauItem";

export default function Tableau({ portailData, cookies }) {
  const { Info } = portailData;
  const [tableau, setTableau] = useState([]);
  const [tableauEmpty, setTableauEmpty] = useState(false);

  let info = [];
  Info.forEach((i) => {
    let r = stripHtml(i).result;
    info.push(r);
  });

  const genMinMax = () => {
    let month = String(new Date().getMonth() + 1);
    const year = new Date().getFullYear();
    if (month.length == 1) {
      month = "0" + month;
    }

    const min = `${year}-${month}-01`;
    const max = `${year}-${month}-31`;
    return [min, max];
  };

  const getTableau = async () => {
    let parsedCookies = "";
    let sessionId;
    JSON.parse(cookies).forEach((c) => {
      let cookie = `${c.name}=${c.value};`;
      parsedCookies += cookie;
      sessionId = c.value;
    });
    const [min, max] = genMinMax();
    const reqData = {
      sessionId,
      eleveId: portailData.Id,
      dateMin: min,
      dateMax: max,
    };

    const res = await PortailReq(
      "GetEvenementsCalendrier",
      parsedCookies,
      " https://app3.ecolecatholique.ca/sp/parent/portail_parent/main.htm",
      reqData
    );
    let e = res.d[0].Evenements;
    for (let i=0; i<e.length; i++) {
      e[i]["key"] = String(i)
    }

    setTableau(e);
    if (res.d[0].Evenements.length == 0) {
      setTableauEmpty(true);
    }
  };

  if (tableauEmpty == false && tableau.length == 0) {
    getTableau();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={tableau}
          renderItem={({ item }) => {
            return (
              <View key={item.key}>
                <TableauItem item={item} />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.info}>
        {info.map((i) => {
          return (
            <View key={i}>
              <Text style={styles.infoText}>
                {i}
              </Text>
              <Text></Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    backgroundColor: "#f5e79e",
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    color: "#8a6d3b",
  },
  content: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 15,
    paddingTop: 10,
  },
});
