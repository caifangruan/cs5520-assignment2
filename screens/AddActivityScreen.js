import React, { useState } from 'react';
import { View, StyleSheet, Alert, Platform, Text } from 'react-native';
import { writeToDB } from '../Firebase/Firebase-helper';
import AddActivity from '../components/AddActivity';


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
  function backtoPreviousPage(){
    navigation.goBack()
  }

  return (
    <AddActivity
    handleSave={handleSave}
    handleDateChange={handleDateChange}
    activityType ={activityType}
    setActivityType ={setActivityType}
    duration={duration}
    setDuration={setDuration}
    date = {date}
    isActivityPickerOpen ={isActivityPickerOpen}
    setIsActivityPickerOpen = {setIsActivityPickerOpen}
    isDatePickerVisible ={isDatePickerVisible}
    setIsDatePickerVisible = {setIsDatePickerVisible}
    isSpecial={false}
    backtoPrevious={backtoPreviousPage}
    />
  );
};

export default AddActivityScreen;