//Type rnfe
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors } from "./styles";


export default function PressableButton({
  buttonPressed,
  customizedStyle,
  children,
}) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.pressableDefault,
          customizedStyle,
          pressed && styles.pressedStyle,
        ];
      }}
      android_ripple={{ color: colors.rippleEffect }}
      onPress={buttonPressed}
      hitSlop={15}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableDefault: {
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressedStyle: {
    backgroundColor: colors.buttonEffect,
  },
});
