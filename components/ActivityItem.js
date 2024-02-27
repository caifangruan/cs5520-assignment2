import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "./CardComponent";
import { colors } from "./styles";


export default function AcitivityItem({ entries, editEntriesPressed }) {
  return (
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
      <PressableButton
          customizedStyle={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 300,
          }}
          buttonPressed={() => {
            editEntriesPressed();
          }}
      >
      <View style={styles.activityItem}>
      <Text style={styles.activity}>{entries.activityType}</Text>
       {entries.isSpecial && (
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
              width={150}
              height={25}
              radius={3}
              marginRight={10}
            >
              <Text style={styles.activityInfo}>{entries.date}</Text>
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
            <Text style={styles.activityInfo}>{`${entries.duration} mins`}</Text>
          </CardComponent>
          </View>
        </PressableButton>
      </CardComponent>
    </View>
  );
}
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
    paddingRight: 15,
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
