import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InfinitePager from "react-native-infinite-pager";
import { addMonths, startOfMonth } from "date-fns"
import { useSharedValue } from "react-native-reanimated";
import { CalendarProvider, useCalendar } from "@/components/CalendarContext";

import Month from '../components/Month'

const today = new Date()
today.setUTCHours(0, 0, 0, 0)

const CalendarContent = () => {
  const { calendarState } = useCalendar();

  return (
    <GestureHandlerRootView>
      <View style={styles.flex}>
        <InfinitePager
          PageComponent={Page}
          style={styles.flex}
          pageWrapperStyle={styles.flex}
          onPageChange={(index) => { calendarState.selectDate(startOfMonth(addMonths(today, index))) }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}

const Page = ({ index }: { index: number }) => {
  const selectedDatePosition = useSharedValue(0)
  const bottomSheetTranslationY = useSharedValue(0)
  const setCalendarBottom = () => { };

  return (
    <View
      style={[
        styles.flex,
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'white'
        },
      ]}
    >
      <Month
        initialDay={startOfMonth(addMonths(today, index))}
        selectedDatePosition={selectedDatePosition}
        bottomSheetTranslationY={bottomSheetTranslationY}
        setCalendarBottom={setCalendarBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});