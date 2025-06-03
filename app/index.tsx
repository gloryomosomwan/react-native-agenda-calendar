import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import { addMonths, isAfter, isBefore, isSameDay, startOfMonth } from "date-fns"
import { useSharedValue } from "react-native-reanimated";
import { CalendarProvider, useCalendar } from "@/components/CalendarContext";

import Month from '../components/Month'

const today = new Date()
today.setHours(0, 0, 0, 0)

export default function App() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}

const CalendarContent = () => {
  const { calendarState } = useCalendar();
  const pagerRef = useRef<InfinitePagerImperativeApi>(null)
  const isProgrammaticChange = useSharedValue(false)

  const animatedProps = useAnimatedProps(() => {
    return {
      pointerEvents: (isProgrammaticChange.value ? 'none' : 'auto') as 'none' | 'auto',
    };
  });

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      if (isInEarlierMonth(calendarState.currentDate, calendarState.previousDate)) {
        isProgrammaticChange.value = true;
        pagerRef.current?.decrementPage({ animated: true })
      }
      else if (isInLaterMonth(calendarState.currentDate, calendarState.previousDate)) {
        isProgrammaticChange.value = true;
        pagerRef.current?.incrementPage({ animated: true })
      }
    })
    return dayUnsubscribe
  }, [])

  return (
    <GestureHandlerRootView>
      <Animated.View style={styles.flex} animatedProps={animatedProps}>
        <InfinitePager
          ref={pagerRef}
          PageComponent={Page}
          style={styles.flex}
          pageWrapperStyle={styles.flex}
          onPageChange={(index) => {
            if (isProgrammaticChange.value) {
              isProgrammaticChange.value = false;
              return;
            }
            index === 0 ? calendarState.selectDate(today) : calendarState.selectDate(startOfMonth(addMonths(today, index)))
          }}
        />
      </Animated.View>
    </GestureHandlerRootView>
  );
};

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

function isInEarlierMonth(dateToCheck: Date, referenceDate: Date) {
  const monthOfDateToCheck = startOfMonth(dateToCheck);
  const monthOfReferenceDate = startOfMonth(referenceDate);
  return isBefore(monthOfDateToCheck, monthOfReferenceDate);
}

function isInLaterMonth(dateToCheck: Date, referenceDate: Date) {
  const monthOfDateToCheck = startOfMonth(dateToCheck);
  const monthOfReferenceDate = startOfMonth(referenceDate);
  return isAfter(monthOfDateToCheck, monthOfReferenceDate);
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
});