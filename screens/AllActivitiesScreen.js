import { Fontisto } from '@expo/vector-icons';
import React, { useContext, useLayoutEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import ActivitiesList from '../components/ActivitiesList';
import ActivitiesContext from '../components/ActivitiesContext';
import Header from '../components/Header'; 
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../components/styles';

const AllActivitiesScreen = () => {
  const { activities } = useContext(ActivitiesContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
    headerShown: true,
      headerTitle: () => <Header title="All Activities" />,
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Add An Activity')}
          title="Add"
          
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      <ActivitiesList activities={activities} keyPrefix="all" />
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
