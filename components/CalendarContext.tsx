import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { CalendarState } from '../CalendarState';

type CalendarContextType = {
  calendarState: CalendarState;
};

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

type CalendarProviderProps = {
  children: ReactNode;
};

export function CalendarProvider({ children }: CalendarProviderProps) {
  const calendarState = useMemo(() => new CalendarState(), []);

  return (
    <CalendarContext.Provider value={{ calendarState }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);

  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }

  return context;
}