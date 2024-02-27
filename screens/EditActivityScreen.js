import {View, Alert} from "react-native";
import React,{useState} from "react";
import PressableButton from "../components/PressableButton";
import { deletefromDB } from "../Firebase/Firebase-helper";
import { updateDB } from "../Firebase/Firebase-helper";
import { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import AddActivity from "../components/AddActivity";


export default function EditActivityScreen({ route, navigation }) { 
  const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const activitiesItem = route.params.activitiesItem;
  const [duration, setDuration] = useState(`${activitiesItem.duration}`);
  const [activityType, setActivityType] = useState(activitiesItem.activityType);
  const [date, setDate] = useState(new Date(activitiesItem.date));
  const [statusReviewed,setStatusReviewed] = useState(false)
  const [isSpecial,setIsSpecial] = useState(activitiesItem.isSpecial)

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
    let isSpecialUpdate= (activityType == 'Running' || activityType == 'Weights') && duration > 60
    if (reviewed){
      isSpecialUpdate = false
    }
    updateDB(activitiesItem.id, activityType, duration, date.toDateString(), isSpecialUpdate);
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

  const handleEdit = ()=> {Alert.alert(
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
  );}

  function backtoPreviousPage(){
    navigation.goBack()
  }
  
  function setReviewedStatus(status){
    setStatusReviewed(status)
  }

  return (
    <AddActivity
    handleSave={handleEdit}
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
    isSpecial={isSpecial}
    statusReviewed={statusReviewed}
    setStatusReviewed={setReviewedStatus}
    backtoPrevious={backtoPreviousPage}
    />
  );
}