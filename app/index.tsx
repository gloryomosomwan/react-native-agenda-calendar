import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CalendarProvider } from "@/components/CalendarContext";
import Header from "@/components/Header";
import WeekPager from "@/components/WeekPager";
import MonthPager from "@/components/MonthPager";
import BottomSheet from "@/components/BottomSheet";

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

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: paddingTop, paddingBottom: insets.bottom }}>
      <Header />
      {/* <WeekPager /> */}
      <MonthPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
        selectedDatePosition={selectedDatePosition}
      />
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