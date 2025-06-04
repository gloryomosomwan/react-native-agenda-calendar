import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useCalendar } from './CalendarContext';
import { addWeeks, differenceInCalendarWeeks, isSameWeek, startOfWeek } from 'date-fns';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Week from './Week';

const today = new Date()
today.setHours(0, 0, 0, 0)

type WeekPagerProps = {
  bottomSheetTranslationY: SharedValue<number>
}

export default function WeekPager({ bottomSheetTranslationY }: WeekPagerProps) {
  const { calendarState } = useCalendar();
  const weekPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const isProgrammaticChange = useSharedValue(false)
  const didInitialSync = useRef<boolean>(false)
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      if (isSameWeek(calendarState.currentDate, calendarState.previousDate)) return;
      isProgrammaticChange.value = true;
      weekPagerRef.current?.setPage(differenceInCalendarWeeks(calendarState.currentDate, today), { animated: false })
    })
    return dayUnsubscribe
  }, [])

  useEffect(() => {
    const monthUnsubscribe = calendarState.monthSubscribe(() => {
      // MonthPager's onPageChange is invoked on mount so we skip that initial "change"
      if (didInitialSync.current === false) {
        didInitialSync.current = true;
        return;
      }
      isProgrammaticChange.value = true;
      weekPagerRef.current?.setPage(differenceInCalendarWeeks(calendarState.currentDate, today), { animated: false })
    })
    return monthUnsubscribe
  }, [])

  const rWeekPagerStyle = useAnimatedStyle(() => {
    return {
      opacity: bottomSheetTranslationY.value === -235 ? 1 : 0
    }
  })

  return (
    <Animated.View style={[styles.weekPagerContainer, { paddingTop: paddingTop + 30 + 5 + 17 }, rWeekPagerStyle]}>
      {/* 30 (size of header) + 5 (header margin) + 17 (weekday name text height) */}
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
          let date = index === 0 ? today : startOfWeek(addWeeks(today, index))
          calendarState.selectPreviousDate(calendarState.currentDate)
          calendarState.weekSelectDate(date)
        }}
      />
    </Animated.View>
  )
}

const WeekPage = ({ index }: { index: number }) => {
  const selectedDatePosition = useSharedValue(0)
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  weekPagerContainer: {
    position: 'absolute',
    zIndex: 1
  }
})