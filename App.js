import { View } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from './screens/StartScreen';
import AllActivitiesScreen from './screens/AllActivitiesScreen';
import SpecialActivitiesScreen from './screens/SpecialActivitiesScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import { colors } from './components/styles';
import PressableButton from "./components/PressableButton";
import EditActivityScreen from "./screens/EditActivityScreen";

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Main tab navigator function component, 
//holds the bottom tabs in the app
function MainTabNavigator({ navigation }) {

 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => {
          return (
            <View style={{ marginRight: 10 }}>
              <PressableButton
                buttonPressed={() => navigation.navigate("Add An Activity")}
              >
                <AntDesign
                  name="plus"
                  size={24}
                />
              </PressableButton>
            </View>
          )}})}>
      <Tab.Screen 
        name="All Activities" 
        component={AllActivitiesScreen} 
        options={{
          tabBarActiveTintColor: colors.tabIconColor,
          tabBarIcon: ({focused}) => (
            <Fontisto name="dollar" size={22} color= {focused? colors.tabIconColor:"black"} /> 
          ),
        }}/>
      <Tab.Screen 
        name="Special Activities" 
        component={SpecialActivitiesScreen} 
        options={{
          tabBarActiveTintColor: colors.tabIconColor,
          tabBarIcon: ({focused}) => (
            <AntDesign name="exclamation" size={22} color= {focused? colors.tabIconColor:"black"} /> 
          ),
        }}/>
    </Tab.Navigator>
    
  );
}

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="Add An Activity" component={AddActivityScreen} />
      <Stack.Screen name="Edit Activity" component={EditActivityScreen} options={{ title: "Edit" }}
        />
    </Stack.Navigator>
  </NavigationContainer>
    
  );
};

export default App;
