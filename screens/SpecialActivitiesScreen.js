import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header'; 
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../components/styles';
import { collection, query, where } from "firebase/firestore";
import { db } from "../Firebase/Firebase-setup";
import ActivityList from '../components/ActivityList';

const SpecialActivitiesScreen = () => {

  const navigation = useNavigation();

  // useLayoutEffect hook to set options 
  //for the navigation header on component mount/update
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <Header title="Special Activities" />
    });
  }, [navigation]);
  
  const q = query(
    collection(db, "activities"),
    where("isSpecial", "==", true),
  );

  function navigate(activities) {
    navigation.navigate("Edit Activity", { activitiesItem: activities });
  }


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

export default SpecialActivitiesScreen;
