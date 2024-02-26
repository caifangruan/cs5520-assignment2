
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, spacing } from './styles'; 

const InputField = ({ placeholder, value, onChangeText, keyboardType, error }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        placeholderTextColor={colors.border}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.small,
  },
  input: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.small,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: spacing.xsmall,
  },
});

export default InputField;
