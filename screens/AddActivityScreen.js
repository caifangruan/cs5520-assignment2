import InputField from '../components/InputField';
import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { View, StyleSheet, Button, Alert, Platform, Text, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActivitiesContext from '../components/ActivitiesContext'; 
import { colors, spacing } from '../components/styles'; 

const AddActivityScreen = ({ navigation }) => {
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  
  const { addActivity } = useContext(ActivitiesContext);

  // Handle saving the new activity
  const handleSave = () => {
    if (!activityType || isNaN(duration) || duration <= 0) {
      Alert.alert('Error', 'Please fill in all fields and ensure the data is valid.');
      return;
    }

    // Create a new activity object with a unique ID 
    //and add it using the context
    const durationNum = Number(duration);
    const newActivity = {
      id: uuidv4(), 
      type: activityType,
      duration: durationNum,
      date: date.toISOString().split('T')[0], 
    };
    addActivity(newActivity);
    navigation.goBack();
    }

    // Handle date change from the date picker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setIsDatePickerVisible(Platform.OS === 'ios'); 
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
        open={isActivityPickerOpen}
        value={activityType}
        items={[
          { label: 'Swimming', value: 'Swimming' },
          { label: 'Weights', value: 'Weights' },
          { label: 'Yoga', value: 'Yoga' },
          { label: 'Cycling', value: 'Cycling' },
          { label: 'Hiking', value: 'Hiking' },
          { label: 'Running', value: 'Running' },
          { label: 'Walking', value: 'Walking' },
          { label: 'Basketball', value: 'Basketball' },
        ]}
        setOpen={setIsActivityPickerOpen}
        setValue={setActivityType}
        zIndex={3000}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownStyle={styles.dropdownStyle}
      />
      <Text style={styles.label}>Duration (min) *</Text>
      <InputField
        placeholder="Duration (min)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Date *</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setIsDatePickerVisible(true)}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background,
  },
  dropdownContainer: {
    height: 40,
    marginBottom: spacing.medium,
  },
  dropdown: {
    backgroundColor: colors.secondary,
  },
  dropdownStyle: {
    backgroundColor: colors.secondary,
  },
  input: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  dateInput: {
    padding: 10,
    backgroundColor: colors.secondary,
    marginVertical: spacing.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.medium,
  },
  label: {
    fontSize: 16,
    marginBottom: spacing.xsmall,
    color: colors.text,
  },
});

export default AddActivityScreen;