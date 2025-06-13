import React from "react";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getWeekOfMonth } from "date-fns";

import { CalendarProvider } from "@/components/CalendarContext";
import { useTheme } from "@/utils/useTheme";
import Header from "@/components/Header";
import WeekPager from "@/components/WeekPager";
import MonthPager from "@/components/MonthPager";
import Agenda from "@/components/Agenda";
import TodayButton from "@/components/TodayButton";
import { CalendarAppearanceProvider } from "@/components/CalendarAppearanceContext";
import { useCalendarAppearance } from '@/components/CalendarAppearanceContext'

export default function App() {
  return (
    <GestureHandlerRootView>
      <CalendarProvider>
        <CalendarAppearanceProvider>
          <CalendarContent />
        </CalendarAppearanceProvider>
      </CalendarProvider>
    </GestureHandlerRootView>
  );
}
const image = { uri: 'https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };

const CalendarContent = () => {
  const insets = useSafeAreaInsets();
  let paddingTop = Platform.OS === "android" ? 0 : insets.top;
  const selectedDatePosition = useSharedValue((paddingTop + 52) + (47 * (getWeekOfMonth(new Date()) - 1)));
  const calendarBottom = useSharedValue((47 * 6) + paddingTop + 52);
  const bottomSheetTranslationY = useSharedValue(calendarBottom.value);
  const theme = useTheme();
  const { isGradientBackground } = useCalendarAppearance()

  return (
    <View style={{ flex: 1, backgroundColor: theme.secondary, paddingTop: paddingTop, paddingBottom: insets.bottom }}>
      <Header />
      {isGradientBackground &&
        <ImageBackground style={{ flex: 1, zIndex: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 400 }} source={image} resizeMode="cover" />
      }
      <WeekPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
      />
      <MonthPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
        selectedDatePosition={selectedDatePosition}
      />
      {/* <Agenda
        bottomSheetTranslationY={bottomSheetTranslationY}
      /> */}
      <TodayButton
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({});