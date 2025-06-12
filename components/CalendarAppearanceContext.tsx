import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type CalendarAppearanceContextType = {
  heatmapActive: boolean;
  setHeatmapActive: (active: boolean) => void;
  isGradientBackground: boolean
};

const CalendarAppearanceContext = createContext<CalendarAppearanceContextType | undefined>(undefined);

export function CalendarAppearanceProvider({ children }: { children: ReactNode }) {
  const [heatmapActive, setHeatmapActive] = useState(false);
  const scheme = useColorScheme()
  const isGradientBackground = scheme === 'light' ? true : false
  return (
    <CalendarAppearanceContext.Provider value={{ heatmapActive, setHeatmapActive, isGradientBackground }}>
      {children}
    </CalendarAppearanceContext.Provider>
  );
}

export function useCalendarAppearance() {
  const context = useContext(CalendarAppearanceContext);
  if (context === undefined) {
    throw new Error('useCalendarAppearance must be used within a CalendarAppearanceProvider');
  }
  return context;
}