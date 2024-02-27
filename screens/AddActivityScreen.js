import InputField from '../components/InputField';
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Platform, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing } from '../components/styles'; 
import PressableButton from '../components/PressableButton';
import { writeToDB } from '../Firebase/Firebase-helper';


const AddActivityScreen = ({ navigation }) => {
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  
  // Handle saving the new activit
  const handleSave = () => {
    if (!activityType || isNaN(duration) || duration <= 0) {
      Alert.alert('Error', 'Please fill in all fields and ensure the data is valid.');
      return;
    }
    else {
    // Create a new activity object with a unique ID 
    //and add it using the context
    OnTextEnterDB();
    navigation.goBack();
    }
  }

  // Handle date change from the date picker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setIsDatePickerVisible(false);
    setDate(currentDate);
  };

  function OnTextEnterDB() {
    const durationNum = Number(duration);
    const newActivity = {
      activityType: activityType,
      duration: durationNum,
      date: date.toDateString(), 
      isSpecial: (activityType == 'Running' || activityType == 'Weights') && duration > 60,
    };
    writeToDB(newActivity);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
        open={isActivityPickerOpen}
        value={activityType}
        items={[
          { label: 'Walking', value: 'Walking' },
          { label: 'Running', value: 'Running' },
          { label: 'Swimming', value: 'Swimming' },
          { label: 'Weights', value: 'Weights' },
          { label: 'Yoga', value: 'Yoga' },
          { label: 'Cycling', value: 'Cycling' },
          { label: 'Hiking', value: 'Hiking' },
        ]}
        setOpen={setIsActivityPickerOpen}
        setValue={setActivityType}
        zIndex={3000}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownStyle={styles.dropdownStyle}
      />
      <View style={{ height: 16 }} />

      <Text style={styles.label}>Duration (min) *</Text>
      <InputField
        placeholder="Duration (min)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <View style={{ height: 16 }} />
      
      <Text style={styles.label}>Date *</Text>
      <PressableButton customizedStyle={{
           padding: 10,
           backgroundColor: colors.secondary,
          }} 
        buttonPressed={() => setIsDatePickerVisible(true)}>
        <Text>{date.toDateString()}</Text>
      </PressableButton>
      {isDatePickerVisible && (
      
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      <View style={{ height: 60}} />
      <View style={styles.buttonContainer}>
      <PressableButton
          customizedStyle={{
            backgroundColor:'red',
            height: 35,
            width: 100,
          }}
          buttonPressed={()=>navigation.goBack()}
        >
          <Text>Cancel</Text>
      </PressableButton>
      <PressableButton
          customizedStyle={{
            backgroundColor:'blue',
            height: 35,
            width: 100,
            
          }}
          buttonPressed={() => handleSave()}
        >
          <Text>Save</Text>
        </PressableButton>
       
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 16,
    marginBottom: spacing.xsmall,
    color: colors.text,
  },
});

export default AddActivityScreen;