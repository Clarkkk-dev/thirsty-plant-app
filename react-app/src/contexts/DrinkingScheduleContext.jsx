import React, { createContext, useState, useContext } from 'react';

const DrinkingScheduleContext = createContext();

export const useDrinkingSchedule = () => useContext(DrinkingScheduleContext);

export const DrinkingScheduleProvider = ({ children }) => {

  const [drinkSchedule, setDrinkSchedule] = useState([
    "7:30 AM",
    "9:00 AM",
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
    "6:30 PM",
    "8:40 PM",
    "11:42 PM",
    "11:56 PM",
    "12:03 AM",
  ]);

  return (
    <DrinkingScheduleContext.Provider value={{ drinkSchedule, setDrinkSchedule }}>
      {children}
    </DrinkingScheduleContext.Provider>
  );
};
