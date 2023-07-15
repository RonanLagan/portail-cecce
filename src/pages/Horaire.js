import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import PortailReq from "../utils/PortailReq";
import HoraireItem from "../components/HoraireItem";
import ViewPeriode from "../components/ViewPeriode";

export default function Horaire({ cookies, portailData }) {
  const [horaire, setHoraire] = useState([]);
  const [viewingPeriode, setViewingPeriode] = useState({ current: "null" });
  const [emptyRes, setEmptyRes] = useState(false);

  const genMinMax = (month) => {
    let year = String(new Date().getFullYear());
    if (String(month).length != 2) {
      month = "0" + String(month);
    }

    let min = `${year}-${month}-01`;
    let max = `${year}-${month}-31`;
    return [min, max];
  };

  const viewPeriode = (periode) => {
    setViewingPeriode(periode);
  };

  const getHoraire = async (m) => {
    console.log("Making req");
    const [min, max] = genMinMax(m);
    let sessionId;
    let parsedCookies = "";
    JSON.parse(cookies).forEach((c) => {
      let cookie = `${c.name}=${c.value};`;
      parsedCookies += cookie;
      sessionId = c.value;
    });

    let id = portailData.Id;
    const reqPayload = {
      sessionId,
      eleveId: String(id),
      dateMin: min,
      dateMax: max,
    };
    const res = await PortailReq(
      "GetHoraires",
      parsedCookies,
      "https://app3.ecolecatholique.ca/sp/parent/portail_parent/main.htm",
      reqPayload
    );
    if (res.d[0].CalendrierScolaire.length == 0) {
      setEmptyRes(true);
    }
    setHoraire(res.d[0].CalendrierScolaire);
  };
  if (horaire.length == 0 && emptyRes == false) {
    getHoraire(new Date().getMonth() + 1);
  }

  return (
    <View style={styles.container}>
      {(() => {
        if (emptyRes) {
          return (
            <View style={styles.noHorraire}>
              <Text style={styles.noHorraireTxt}>Aucune horaire disponible</Text>
            </View>
          );
        } else {
          return (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.Date}
              data={horaire}
              renderItem={({ item }) => {
                return <HoraireItem viewPeriode={viewPeriode} horaire={item} />;
              }}
            />
          );
        }
      })()}
      <ViewPeriode periode={viewingPeriode} viewPeriode={viewPeriode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noHorraire: {
    backgroundColor: "#f5e79e",
    padding: 20,
    borderRadius: 10
  },
  noHorraireTxt: {
    color: "#8a6d3b",
  }
});
