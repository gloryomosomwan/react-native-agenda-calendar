import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { addMonths, differenceInCalendarMonths, isAfter, isBefore, isSameMonth, startOfMonth } from 'date-fns';
import { useCalendar } from './CalendarContext';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Month from '@/components/Month'

const today = new Date()
today.setHours(0, 0, 0, 0)

export default function MonthPager() {
  const { calendarState } = useCalendar();
  const monthPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const isProgrammaticChange = useSharedValue(false)
  const didInitialSync = useRef<boolean>(false)
  const insets = useSafeAreaInsets()

  // const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const paddingTop = 0

  const animatedProps = useAnimatedProps(() => {
    return {
      pointerEvents: (isProgrammaticChange.value ? 'none' : 'auto') as 'none' | 'auto',
    };
  });

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      if (isInEarlierMonth(calendarState.currentDate, calendarState.previousDate)) {
        isProgrammaticChange.value = true;
        monthPagerRef.current?.decrementPage({ animated: true })
      }
      else if (isInLaterMonth(calendarState.currentDate, calendarState.previousDate)) {
        isProgrammaticChange.value = true;
        monthPagerRef.current?.incrementPage({ animated: true })
      }
    })
    return dayUnsubscribe
  }, [])

  useEffect(() => {
    const weekUnsubscribe = calendarState.weekSubscribe(() => {
      // WeekPager's onPageChange is invoked on mount so we skip that initial "change"
      if (didInitialSync.current === false) {
        didInitialSync.current = true;
        return;
      }
      if (isSameMonth(calendarState.currentDate, calendarState.previousDate)) return;
      isProgrammaticChange.value = true;
      monthPagerRef.current?.setPage(differenceInCalendarMonths(calendarState.currentDate, today), { animated: false })
    })
    return weekUnsubscribe
  }, [])

  return (
    <Animated.View style={{ paddingTop: paddingTop }} animatedProps={animatedProps}>
      <InfinitePager
        ref={monthPagerRef}
        PageComponent={MonthPage}
        // style={styles.flex}
        // pageWrapperStyle={styles.flex}
        onPageChange={(index) => {
          if (isProgrammaticChange.value === true) {
            isProgrammaticChange.value = false;
            return;
          }
          let date = index === 0 ? today : startOfMonth(addMonths(today, index))
          calendarState.selectPreviousDate(calendarState.currentDate)
          calendarState.monthSelectDate(date)
        }}
      />
    </Animated.View>
  )
}

const MonthPage = ({ index }: { index: number }) => {
  const selectedDatePosition = useSharedValue(0)
  const bottomSheetTranslationY = useSharedValue(0)
  const setCalendarBottom = () => { };
  return (
    <View
      style={[
        // styles.flex,
        {
          // alignItems: "center",
          // justifyContent: "center",
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

const styles = StyleSheet.create({})