import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CalendarProvider } from "@/components/CalendarContext";
import { useTheme } from "@/utils/useTheme";
import Header from "@/components/Header";
import WeekPager from "@/components/WeekPager";
import MonthPager from "@/components/MonthPager";
import Agenda from "@/components/Agenda";
import TodayButton from "@/components/TodayButton";

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
  const theme = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: theme.secondary, paddingTop: paddingTop, paddingBottom: insets.bottom }}>
      <Header />
      <WeekPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
      />
      <MonthPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
        selectedDatePosition={selectedDatePosition}
      />
      <Agenda
        bottomSheetTranslationY={bottomSheetTranslationY}
      />
      <TodayButton
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({});