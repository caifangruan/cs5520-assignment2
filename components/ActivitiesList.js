
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, spacing, typography } from './styles';

const ActivitiesList = ({ activities }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.activityType}>{item.type}</Text>
      <Text style={styles.activityInfo}>{`${item.date}   -   ${item.duration} mins`}</Text>
    </View>
  );

  return (
    <FlatList
      data={activities}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: spacing.small,
  },
  itemContainer: {
    backgroundColor: colors.secondary,
    padding: spacing.medium,
    marginVertical: spacing.small,
    borderRadius: spacing.xsmall,
    
  },
  activityType: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.text,
  },
  activityInfo: {
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  
});

export default ActivitiesList;