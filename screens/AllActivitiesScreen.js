
import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header'; 
import { colors, spacing } from '../components/styles';
import { collection, query } from "firebase/firestore";
import { db } from "../Firebase/Firebase-setup";
import ActivityList from '../components/ActivityList';

// Define the AllActivitiesScreen functional component
const AllActivitiesScreen = ({ navigation }) => {
  
  const q = query(collection(db, "activities"));

  /**
   * Function to navigate to EditEntries screen
   * @param entries: pass the entries item to the EditEntries screen
   */
  function navigate(activities) {
    navigation.navigate("Edit Activity", { activitiesItem: activities });
  }

  // useLayoutEffect hook to set options 
  //for the navigation header on component update
  useLayoutEffect(() => {
    navigation.setOptions({
    headerShown: true,
      headerTitle: () => <Header title="All Activities" />
    });
  }, [navigation]);

  // Render the component's view
  return (
    <View style={styles.container}>
     <ActivityList query={q} EntriesPressed={navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
  
});

export default AllActivitiesScreen;
