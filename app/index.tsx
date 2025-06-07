import React, { useEffect, useMemo } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView, BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet';

import { CalendarProvider } from "@/components/CalendarContext";
import Header from "@/components/Header";
import WeekPager from "@/components/WeekPager";
import MonthPager from "@/components/MonthPager";
import Event from "@/components/Event";
import Activity from "@/components/Activity";

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
  const initialCalendarBottom = (47 * 6) + paddingTop + 52
  const calendarBottom = useSharedValue((47 * 6) + paddingTop + 52)

  const snapPoints = useMemo(() => [667 - initialCalendarBottom, 667 - initialCalendarBottom + 235], []);

  useAnimatedReaction(() => { return bottomSheetTranslationY.value },
    (curr, prev) => {
      // console.log(curr)
    })

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8', paddingTop: paddingTop, paddingBottom: insets.bottom }}>
      <Header
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
      />
      <WeekPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
      />
      <MonthPager
        bottomSheetTranslationY={bottomSheetTranslationY}
        calendarBottom={calendarBottom}
        selectedDatePosition={selectedDatePosition}
      />
      <BottomSheet
        snapPoints={snapPoints}
        animatedPosition={bottomSheetTranslationY}
        enableOverDrag={false}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        animateOnMount={false}
        style={styles.bottomSheet}
      >
        <BottomSheetScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionHeadingText}>{"Schedule"}</Text>
            <Event />
            <Event />
            <Event />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeadingText}>{"Assignments"}</Text>
            <Activity />
            <Activity />
            <Activity />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeadingText}>{"Tasks"}</Text>
            <Activity />
            <Activity />
            <Activity />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    zIndex: 3,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionHeadingText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 4
  }
});