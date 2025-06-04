import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useCalendar } from './CalendarContext';
import { addWeeks, differenceInCalendarWeeks, startOfWeek } from 'date-fns';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import Week from './Week';

const today = new Date()
today.setHours(0, 0, 0, 0)

export default function WeekPager() {
  const { calendarState } = useCalendar();
  const weekPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const isProgrammaticChange = useSharedValue(false)

  useEffect(() => {
    const unsubscribe = calendarState.monthSubscribe(() => {
      isProgrammaticChange.value = true;
      weekPagerRef.current?.setPage(differenceInCalendarWeeks(calendarState.currentDate, today), { animated: false })
    })
    return unsubscribe
  }, [calendarState.currentDate])

  return (
    <GestureHandlerRootView style={{}}  >
      <Animated.View >
        <InfinitePager
          ref={weekPagerRef}
          PageComponent={WeekPage}
          // style={styles.flex}
          // pageWrapperStyle={styles.flex}
          onPageChange={(index) => {
            if (isProgrammaticChange.value === true) {
              isProgrammaticChange.value = false;
              return;
            }
            index === 0 ? calendarState.weekSelectDate(today) : calendarState.weekSelectDate(startOfWeek(addWeeks(today, index)))
          }}
        />
      </Animated.View>
    </GestureHandlerRootView>
  )
}

const WeekPage = ({ index }: { index: number }) => {
  const selectedDatePosition = useSharedValue(0)
  const bottomSheetTranslationY = useSharedValue(0)
  return (
    <View
      style={[
        // styles.flex,
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'white'
        },
      ]}
    >
      <Week
        initialDay={startOfWeek(addWeeks(today, index))}
        selectedDatePosition={selectedDatePosition}
        bottomSheetTranslationY={bottomSheetTranslationY}
      />
    </View>
  );
};

const styles = StyleSheet.create({})