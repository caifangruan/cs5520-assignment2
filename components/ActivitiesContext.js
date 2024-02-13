import React, { createContext, useState } from 'react';

const ActivitiesContext = createContext();

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [specialActivities, setSpecialActivities] = useState([]);

  const addActivity = (activity) => {
    setActivities((currentActivities) => [...currentActivities, activity]);
    console.log('New activity:', activity);

    if (activity.duration > 60) {
        console.log('Adding special activity:', activity); 
      setSpecialActivities((currentSpecialActivities) => [...currentSpecialActivities, { ...activity }]);
    }
  };
  
  
  

  
  const addSpecialActivity = (activity) => {
    setSpecialActivities((currentSpecialActivities) => [...currentSpecialActivities, activity]);
  };
  

  return (
    <ActivitiesContext.Provider value={{ activities, specialActivities, addActivity, addSpecialActivity }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export default ActivitiesContext;


