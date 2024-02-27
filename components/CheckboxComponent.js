import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './styles';

/**
 * CheckboxComponent is a custom checkbox component.
 *
 * @param {boolean} isChecked - Indicates whether the checkbox is checked.
 * @param {function} setChecked - A function to handle checkbox state changes.
 * @returns {JSX.Element} - A React component that displays a checkbox with a label.
 */
const CheckboxComponent = ({isChecked,setChecked}) => {
  return(
    <View style={styles.section}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
      <Text style={styles.label}>This item is marked as special. Select the checkbox if you would like to approve it</Text>
    </View>
  )
  };

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 13,
    height: 13,
    borderWidth: 1,
    borderColor: colors.text,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: colors.button,
  },
  label: {
    fontSize: 13,
    color: colors.text,
  },
});

export default CheckboxComponent;