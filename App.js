import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Navigation from "./src/Navigation";

import Tableau from "./src/pages/Tableau";
import Resultats from "./src/pages/Resultats";
import Horaire from "./src/pages/Horaire";
import Assiduite from "./src/pages/Assiduite";
import Settings from "./src/pages/Settings";
import Authenticate from "./src/pages/Authenticate";
import Loading from "./src/pages/Loading";

import PortailReq from "./src/utils/PortailReq";

export default function App() {
  const pages = {
    Tableau,
    Resultats,
    Horaire,
    Assiduite,
    Settings,
  };

  const [authenticated, setAuthenticated] = useState("yes");
  const [cookies, setCookies] = useState("");

  const [page, setPage] = useState("Tableau");
  const [portailData, setPortailData] = useState({ loaded: "null" });
  const [notes, setNotes] = useState({ loaded: "null" });
  const [etape, setEtape] = useState("");
  const [etapes, setEtapes] = useState({ loaded: "null" });
  const [assiduite, setAssiduite] = useState([]);

  const saveCookie = async (cookie) => {
    try {
      await AsyncStorage.setItem("cookie", cookie);
      setCookies(cookie);
      try {
        await getPortail();
        setAuthenticated("yes");
      } catch (e) {
        throw e;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCookie = async () => {
    try {
      const cookie = await AsyncStorage.getItem("cookie");
      if (cookie == undefined) {
        setAuthenticated("no");
      } else {
        setCookies(cookie);
        try {
          await getPortail();
          setAuthenticated("yes");
        } catch (e) {
          throw e;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCookie = async () => {
    try {
      await AsyncStorage.removeItem("cookie");
      setCookies("");
      setAuthenticated("no");
      setPage("Tableau");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCookie();
  });

  const getPortail = async () => {
    if (portailData.loaded === "null" && cookies != "") {
      let parsedCookies = "";
      JSON.parse(cookies).forEach((c) => {
        let cookie = `${c.name}=${c.value};`;
        parsedCookies += cookie;
      });
      let pd = await PortailReq(
        "GetPortailData",
        parsedCookies,
        "https://app3.ecolecatholique.ca/sp/parent/portail_parent/main.htm"
      );
      let { Ecoles, Niveau, Login, Nom, Prenom, Ecole, Id } = pd.d.Login.Person;
      let { InfoMessages } = pd.d.PortailEleves[0];
      let person = {
        Ecoles,
        Niveau,
        Login,
        Nom,
        Prenom,
        Ecole,
        Id,
        Info: InfoMessages,
      };
      setPortailData(person);
      let etapes = [];
      pd.d.PortailEleves[0].Etapes.forEach((e) => {
        let { Id, Text, EstCourante } = e;
        etapes.push({ Id, Text, EstCourante });
      });
      setEtapeStorage(etapes);

      let ass = pd.d.PortailEleves[0].AssiduiteSommaires[0].Items;
      setAssiduite(ass);
    } else {
      return null;
    }
  };

  const setEtapeStorage = async (etapes) => {
    let savedEtape = await AsyncStorage.getItem("etape");
    console.log(`savedEtape: ${savedEtape}`);
    let currentEtape;
    let n = {};
    etapes.forEach((e) => {
      if (e.EstCourante) {
        currentEtape = e.Id;
      }
      n[e.Id] = { loaded: false, data: [] };
    });
    if (currentEtape != savedEtape) {
      await AsyncStorage.setItem("etape", currentEtape);
    }
    setNotes(n);
    setEtape(currentEtape);
    setEtapes(etapes);
  };

  const getNotes = async (e) => {
    let parsedCookies = "";
    let sessionId;
    JSON.parse(cookies).forEach((c) => {
      let cookie = `${c.name}=${c.value};`;
      parsedCookies += cookie;
      sessionId = c.value;
    });
    let res = await PortailReq(
      "GetBulletin",
      parsedCookies,
      "https://app3.ecolecatholique.ca/sp/parent/portail_parent/main.htm",
      { etapeId: e, sessionId: sessionId, eleveId: portailData.Id }
    );
    let resultats = [];
    res.d.Resultats.forEach((res) => {
      const { Classe, Matiere, Moyenne, PrintLink } = res;
      let m = { Classe, Matiere, Moyenne, PrintLink };
      resultats.push(m);
    });
    let newNotes = notes;
    newNotes[e].loaded = true;
    newNotes[e].data = resultats;
    setNotes(JSON.parse(JSON.stringify(newNotes)));
  };
  return (() => {
    if (authenticated == "yes" && portailData.loaded !== "null") {
      return (
        <View style={styles.container}>
          <View style={styles.page}>
            {(() => {
              const Page = pages[page];
              if (page == "Settings") {
                return <Page logout={deleteCookie} portailData={portailData} />;
              } else if (page == "Resultats") {
                return (
                  <Page
                    portailData={portailData}
                    etape={etape}
                    etapes={etapes}
                    notes={notes}
                    getNotes={getNotes}
                    cookies={cookies}
                  />
                );
              } else {
                return (
                  <Page
                    portailData={portailData}
                    etape={etape}
                    etapes={etapes}
                    cookies={cookies}
                    assiduite={assiduite}
                  />
                );
              }
            })()}
          </View>
          <Navigation setPage={setPage} />
        </View>
      );
    } else if (authenticated == "no") {
      return <Authenticate saveCookie={saveCookie} />;
    } else {
      return <Loading />;
    }
  })();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  page: {
    flex: 9,
    padding: 20,
    backgroundColor: "#a0d8ef",
  },
});
