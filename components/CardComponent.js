import { View, StyleSheet, Platform } from "react-native";
import React from "react";

const CardComponent = (props) => {
  return (
    <View
      style={[
        styles(props).body,
      ]}
    >
      {props.children}
    </View>
  );
};
const styles = (props) =>
  StyleSheet.create({
    body: {
      flexDirection: props.flexDirection,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
      backgroundColor: props.color,
      width: props.width,
      height: props.height,
      borderRadius: props.radius,
      marginTop: props.marginTop,
      marginLeft: props.marginLeft,
      marginBottom: props.marginBottom,
      marginRight: props.marginRight,
    },
  });

export default CardComponent;
