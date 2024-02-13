
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, spacing, typography } from './styles';
import { FontAwesome6 } from '@expo/vector-icons';

const ActivitiesList = ({ activities }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.activityDetails}>
        <Text style={styles.activityType}>
          {item.type}
          {item.duration > 60 && (
            <FontAwesome6 name="triangle-exclamation" size={24} color="black" style={styles.iconStyle} />
          )}
        </Text>
        <Text style={styles.activityInfo}>{`${item.date}   -   ${item.duration} mins`}</Text>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: spacing.medium,
    marginVertical: spacing.small,
    borderRadius: spacing.xsmall,
  },
  activityDetails: {
    flex: 1,
  },
  iconStyle: {
    marginLeft: spacing.small, 
  },
  activityType: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.text,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  activityInfo: {
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
});

export default ActivitiesList;
