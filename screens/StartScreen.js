
import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button'; 
import { colors, spacing } from '../components/styles'; 

const StartScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Function to validate the email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  // Function to validate the phone number format (expects 10 digits)
  const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);

  const handleStart = () => {
    const isEmailValid = validateEmail(email);
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    setEmailError(isEmailValid ? '' : 'Please enter a valid email address.');
    setPhoneError(isPhoneNumberValid ? '' : 'Please enter a valid phone number.');

    if (isEmailValid && isPhoneNumberValid) {
        navigation.navigate('MainTab', { screen: 'AllActivitiesScreen' });
    }
  };

  // Function to handle the 'Reset' button press
  const handleReset = () => {
    setEmail('');
    setPhoneNumber('');
    setEmailError('');
    setPhoneError('');
    setActivities([]);
  };

  // Render the StartScreen UI
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <InputField
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={emailError ? styles.errorInput : null}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Phone Number</Text>
      <InputField
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={phoneError ? styles.errorInput : null}
      />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button 
          title="Reset" 
          onPress={handleReset} 
          textColor={colors.error} 
        />
        <Button
          title="Start"
          onPress={handleStart}
          textColor={colors.primary} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    marginBottom: spacing.xsmall,
    color: colors.text,
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.medium,
  },
});

export default StartScreen;
