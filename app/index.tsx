import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CalendarProvider, useCalendar } from "@/components/CalendarContext";

import WeekPager from "@/components/WeekPager";
import MonthPager from "@/components/MonthPager";

export default function App() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}

const CalendarContent = () => {
  return (
    <View style={{ flex: 1 }}>
      <WeekPager />
      {/* <MonthPager /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});