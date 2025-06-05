import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { addMonths, differenceInCalendarMonths, isAfter, isBefore, isSameMonth, startOfMonth } from 'date-fns';
import { useCalendar } from './CalendarContext';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import Animated, { interpolate, SharedValue, useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Month from '@/components/Month'

const EXPANDED_MODE_THRESHOLD = -235

type MonthPagerProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
  selectedDatePosition: SharedValue<number>
}

export default function MonthPager({ bottomSheetTranslationY, calendarBottom, selectedDatePosition }: MonthPagerProps) {
  const { calendarState } = useCalendar();
  const monthPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const isProgrammaticChange = useSharedValue(false)
  const didInitialSync = useRef<boolean>(false)
  const insets = useSafeAreaInsets()
  const pagerOpacity = useSharedValue(1)

  const paddingTop = useSharedValue(Platform.OS === 'android' ? 0 : insets.top)
  // const paddingTop = Platform.OS === 'android' ? 0 : insets.top

  const setCalendarBottom = (y: number) => {
    calendarBottom.value = y
  }

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
      monthPagerRef.current?.setPage(differenceInCalendarMonths(calendarState.currentDate, calendarState.todayDate), { animated: false })
    })
    return weekUnsubscribe
  }, [])

  useEffect(() => {
    const todayUnsubscribe = calendarState.todaySubscribe(() => {
      if (Math.abs(differenceInCalendarMonths(calendarState.previousDate, calendarState.todayDate)) > 1) {
        pagerOpacity.value = withRepeat(
          withTiming(0, { duration: 150 }),
          2,
          true
        );
      }
      isProgrammaticChange.value = true;
      monthPagerRef.current?.setPage(0, { animated: false })
    })
    return todayUnsubscribe
  }, [])

  const rMonthPagerStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: interpolate(
          bottomSheetTranslationY.value,
          [0, EXPANDED_MODE_THRESHOLD],
          [0, (paddingTop.value + 52) - selectedDatePosition.value] // 52 is for the Month padding
        )
      }],
      opacity: pagerOpacity.value,
      pointerEvents: bottomSheetTranslationY.value === -235 ? 'none' : 'auto'
    };
  });

  const rPageStyle = useAnimatedStyle(() => {
    return {
      opacity: bottomSheetTranslationY.value === -235 ? 0 : 1
    }
  })

  const MonthPage = ({ index }: { index: number }) => {
    return (
      <Animated.View style={[rPageStyle]} >
        <Month
          initialDay={startOfMonth(addMonths(calendarState.todayDate, index))}
          selectedDatePosition={selectedDatePosition}
          setCalendarBottom={setCalendarBottom}
        />
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[rMonthPagerStyle]} animatedProps={animatedProps}>
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
          let date = index === 0 ? calendarState.todayDate : startOfMonth(addMonths(calendarState.todayDate, index))
          calendarState.selectPreviousDate(calendarState.currentDate)
          calendarState.monthSelectDate(date)
        }}
      />
    </Animated.View>
  )
}

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