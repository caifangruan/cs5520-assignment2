
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "./CardComponent";
import { colors, spacing } from './styles'; 

const ActivitiesList = ({ activities }) => {
  const renderItem = ({ item }) => {
    return(
    <View>
      <CardComponent
        flexDirection="row"
        alignItems = 'center'
        color={colors.activityItem}
        width={350}
        height={45}
        radius={10}
        marginBottom={15}
      >
      <View style={styles.activityItem}>
      <Text style={styles.activity}>{item.type}</Text>
      {(item.type == 'Running' || item.type == 'Weights') && item.duration > 60 && (
             <Ionicons
             name="warning"
             size={18}
             color={colors.warningSign}
           ></Ionicons>
          )}
      </View>
      <View style={styles.activityDetails}>
          <CardComponent
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="white"
              width={120}
              height={25}
              radius={3}
              marginRight={10}
          >
          <Text style={styles.activityInfo}>{`${item.date.toDateString()}`}</Text>
          </CardComponent>
          <CardComponent
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color={colors.activityDetails}
              width={80}
              height={25}
              radius={3}
              marginRight={10}
          >
            <Text style={styles.activityInfo}>{`${item.duration} mins`}</Text>
          </CardComponent>
      </View>
      </CardComponent>
    </View>
  );}

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={activities}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  activityList:{
    alignItems: "center",
  },
  listContainer: {
    alignItems: "center",
  },
  activityItem:{
    flexDirection: "row",
    width:'35%'
  },
  activity:{
    color: colors.activity,
    paddingLeft: 10,
    paddingRight: 25,
    fontSize: 15,
    fontWeight: "bold",
  },
  activityDetails: {
    flexDirection: "row",
    alignItems: "center",
    width:'65%',
  },
  activityType: {
    alignItems: "center",
  },
  activityInfo: {
    fontSize:12,
    fontWeight: "bold",
  },
});

export default ActivitiesList;
