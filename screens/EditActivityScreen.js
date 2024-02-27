import {View, StyleSheet, Text, Alert,Platform} from "react-native";
import React,{useState} from "react";
import { colors,spacing } from "../components/styles";
import PressableButton from "../components/PressableButton";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { deletefromDB } from "../Firebase/Firebase-helper";
import { updateDB } from "../Firebase/Firebase-helper";
import InputField from '../components/InputField';
import CheckboxComponent from "../components/CheckboxComponent";
import { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";


export default function EditActivityScreen({ route, navigation }) { 
  const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const activitiesItem = route.params.activitiesItem;
  const [duration, setDuration] = useState(`${activitiesItem.duration}`);
  const [activityType, setActivityType] = useState(activitiesItem.activityType);
  const [date, setDate] = useState(new Date(activitiesItem.date));
  const [statusReviewed,setStatusReviewed] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
    headerShown: true,
    headerRight: () => {
      return (
        <View style={{ marginRight: 10 }}>
          <PressableButton
            buttonPressed={onDeletePressed}
          >
            <AntDesign
              name="delete"
              size={24}
            />
          </PressableButton>
        </View>
      )}
    });
  }, [navigation]);

    /**
   * Function to delete the item from the firestore
   * After deleting the item, go back to the screen the user start from
   */
  function onDeletePressed() {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "No" },
        {
          text: "Yes", onPress: () => {
            deletefromDB(activitiesItem.id);
            navigation.goBack();
          }
        }
      ]),
      { cancelable: false }
  
  }

  function onReviewPressed(reviewed) {
    let isSpecial= (activityType == 'Running' || activityType == 'Weights') && duration > 60
    if (reviewed){
      isSpecial = false
    }
    updateDB(activitiesItem.id, activityType, duration, date.toDateString(), isSpecial);
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setIsDatePickerVisible(false);
    setDate(currentDate);
  };

  const handleSave = (reviewed) => {
    if (!activityType || isNaN(duration) || duration <= 0) {
      Alert.alert('Error', 'Please fill in all fields and ensure the data is valid.');
      return;
    }
    else {
    onReviewPressed(reviewed);
    navigation.goBack();
    }
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
      {activitiesItem.isSpecial && (
          <View>
            <CheckboxComponent 
             label = 'This item is marked as special. Select the checkbox if you would like to approve it'
             isChecked={statusReviewed} 
             setChecked={()=>setStatusReviewed(!statusReviewed)}
             />
          </View>
        )}
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
        buttonPressed={() => {
          Alert.alert(
            "Important",
            "Are you sure you want to save these changes?",
            [
              { text: "No" },
              {
                text: "Yes",
                onPress: () => {
                  if (statusReviewed) handleSave(true);
                  else handleSave(false)
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text>Save</Text>
      </PressableButton>
    
      </View>
    </View>
  );
}
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
