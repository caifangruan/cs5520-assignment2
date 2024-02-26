import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import 'react-native-get-random-values';
import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from './screens/StartScreen';
import AllActivitiesScreen from './screens/AllActivitiesScreen';
import SpecialActivitiesScreen from './screens/SpecialActivitiesScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import { ActivitiesProvider } from './components/ActivitiesContext';
import 'react-native-gesture-handler';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator function component, 
//holds the bottom tabs in the app
function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="All Activities" 
        component={AllActivitiesScreen} 
        options={{
          tabBarIcon: ({}) => (
            <Fontisto name="dollar" size={24} color="black" /> 
          ),
        }}/>
      <Tab.Screen 
        name="Special Activities" 
        component={SpecialActivitiesScreen} 
        options={{
          tabBarIcon: ({}) => (
            <AntDesign name="exclamation" size={24} color="black" /> 
          ),
        }}/>
    </Tab.Navigator>
    
  );
}

const App = () => {
  return (
    <ActivitiesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name="Add An Activity" component={AddActivityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActivitiesProvider>
  );
};

export default App;
