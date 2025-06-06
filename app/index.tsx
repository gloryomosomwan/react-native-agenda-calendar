import React, { useEffect, useRef, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CalendarProvider, useCalendar } from "@/components/CalendarContext";
import Header from "@/components/Header";
import WeekPager from "@/components/WeekPager";
import MonthPager from "@/components/MonthPager";
import BottomSheet from "@/components/BottomSheet";
import { isSameDay, isSameMonth, isSameWeek } from "date-fns";

export default function App() {
  return (
    <GestureHandlerRootView>
      <CalendarProvider>
        <CalendarContent />
      </CalendarProvider>
    </GestureHandlerRootView>
  );
}

const CalendarContent = () => {
  const insets = useSafeAreaInsets()
  const bottomSheetTranslationY = useSharedValue(0)
  const selectedDatePosition = useSharedValue(0)
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const calendarBottom = useSharedValue((47 * 6) + paddingTop + 52)
  const { calendarState } = useCalendar()

  let showTodayButton = false

  // if ((bottomSheetTranslationY.value === -235 && !isSameWeek(calendarState.currentDate, calendarState.todayDate)) || (bottomSheetTranslationY.value === 0 && !isSameMonth(calendarState.currentDate, calendarState.todayDate))) {
  //   showTodayButton = true
  // }

  const todayButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: bottomSheetTranslationY.value === -235 ? 0 : 1,
      pointerEvents: bottomSheetTranslationY.value === -235 ? "none" : "auto"
    }
  })

  const setToday = () => {
    if (isSameDay(calendarState.currentDate, calendarState.todayDate)) return;
    calendarState.selectPreviousDate(calendarState.currentDate)
    calendarState.selectToday()
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: paddingTop, paddingBottom: insets.bottom }}>
      <Header />
      <WeekPager
        bottomSheetTranslationY={bottomSheetTranslationY}
      />
      <MonthPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
        selectedDatePosition={selectedDatePosition}
      />
      {/* { */}
      {/* // showTodayButton && */}
      <Animated.View style={[todayButtonStyle, { position: 'absolute', top: 15, zIndex: 999, left: 280 }]}>
        <Button title='Today' onPress={setToday} />
      </Animated.View>
      {/* } */}
      <BottomSheet
        translateY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});