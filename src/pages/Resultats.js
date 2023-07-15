import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ToggleEtapeBtn from "../components/ToggleEtapeBtn";
import Grade from "../components/Grade";
import ViewPdf from "./ViewPdf";

export default function Resultats({ etape, etapes, notes, getNotes, cookies }) {
  const [viewingEtape, setViewingEtape] = useState(etape);
  const [viewingPdf, setViewingPdf] = useState("");

  if (notes[viewingEtape].loaded == false) {
    getNotes(viewingEtape);
  }

  const viewGrade = (grade) => {
    setViewingPdf(grade.PrintLink);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {notes[viewingEtape].data.map((e) => {
          return <Grade key={e.Classe} grade={e} viewGrade={viewGrade} />;
        })}
      </View>
      <View style={styles.etapeContainer}>
        <ToggleEtapeBtn
          setViewingEtape={setViewingEtape}
          viewingEtape={viewingEtape}
          etape={1}
        />
        <ToggleEtapeBtn
          setViewingEtape={setViewingEtape}
          viewingEtape={viewingEtape}
          etape={2}
        />
      </View>
      {(() => {
        if (viewingPdf != "") {
          return (
            <ViewPdf
              viewing={viewingPdf}
              setViewingPdf={setViewingPdf}
              cookies={cookies}
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
  innerContainer: {
    flex: 1,
    marginBottom: 15,
    justifyContent: "space-evenly",
  },
  etapeContainer: {
    display: "flex",
    flexDirection: "row",
    zIndex: -1
  }
});
