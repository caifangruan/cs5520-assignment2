import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ActivityItem from "./ActivityItem";
import { onSnapshot } from "firebase/firestore";


export default function ActivityList({ query, EntriesPressed }) {
  const [entries, setEntries] = useState([]);

  /**
   * Get real time update from firestore
   * push the data from firestore to an array - entries
   */

  useEffect(() => {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      if (querySnapshot.empty) {
        setEntries([]);
      } else {
        let entriesFromDB = [];
        querySnapshot.docs.forEach((doc) => {
          entriesFromDB.push({ ...doc.data(), id: doc.id });
        });
        setEntries(entriesFromDB);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.bottomContaineer}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={entries}
        renderItem={({ item }) => {
          return (
            <ActivityItem
              entries={item}
              editEntriesPressed={() => {
                EntriesPressed(item);
              }}
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  bottomContaineer: {
    flex: 4,
  },
  contentContainerStyle: {
    alignItems: "center",
    marginTop: 25,
  },
});
