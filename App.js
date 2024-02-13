
import 'react-native-get-random-values';
import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivitiesContext from './components/ActivitiesContext'; 
import StartScreen from './screens/StartScreen';
import AllActivitiesScreen from './screens/AllActivitiesScreen';
import SpecialActivitiesScreen from './screens/SpecialActivitiesScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import { ActivitiesProvider } from './components/ActivitiesContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    
    <Tab.Navigator>
      <Tab.Screen name="All Activities" component={AllActivitiesScreen} />
      <Tab.Screen name="Special Activities" component={SpecialActivitiesScreen} />
    </Tab.Navigator>
    
  );
}

const App = () => {
  const [activities, setActivities] = useState([]);

  const addActivity = (newActivity) => {
    setActivities((currentActivities) => [...currentActivities, newActivity]);
  };

  const providerValue = useMemo(() => ({ activities, setActivities, addActivity }), [activities]);

  return (
    <ActivitiesContext.Provider value={providerValue}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name="Add An Activity" component={AddActivityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActivitiesContext.Provider>
  );
};

export default App;
