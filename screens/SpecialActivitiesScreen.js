import React, { useContext, useLayoutEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import ActivitiesList from '../components/ActivitiesList';
import ActivitiesContext from '../components/ActivitiesContext';
import Header from '../components/Header'; 
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../components/styles';

const SpecialActivitiesScreen = () => {
  const { specialActivities } = useContext(ActivitiesContext);
  console.log(specialActivities);
  const navigation = useNavigation();

  // useLayoutEffect hook to set options 
  //for the navigation header on component mount/update
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <Header title="Special Activities" />,
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Add An Activity')}
          title="Add"
        />
      ),
    });
  }, [navigation]);

  // Render the component's view
  return (
    <View style={styles.container}>
      <ActivitiesList activities={specialActivities} keyPrefix="special" />
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
