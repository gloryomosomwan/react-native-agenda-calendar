import { Platform, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useCalendar } from './CalendarContext';
import { addWeeks, differenceInCalendarWeeks, isSameWeek, startOfWeek } from 'date-fns';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Week from './Week';

type WeekPagerProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
}

export default function WeekPager({ bottomSheetTranslationY, calendarBottom }: WeekPagerProps) {
  const { calendarState } = useCalendar();
  const weekPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const isProgrammaticChange = useSharedValue(false)
  const didInitialSync = useRef<boolean>(false)
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const pagerOpacity = useSharedValue(1)

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      if (isSameWeek(calendarState.currentDate, calendarState.previousDate)) return;
      isProgrammaticChange.value = true;
      weekPagerRef.current?.setPage(differenceInCalendarWeeks(calendarState.currentDate, calendarState.todayDate), { animated: false })
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
      weekPagerRef.current?.setPage(differenceInCalendarWeeks(calendarState.currentDate, calendarState.todayDate), { animated: false })
    })
    return monthUnsubscribe
  }, [])

  useEffect(() => {
    const todayUnsubscribe = calendarState.todaySubscribe(() => {
      if (isSameWeek(calendarState.previousDate, calendarState.todayDate)) return;
      if (Math.abs(differenceInCalendarWeeks(calendarState.previousDate, calendarState.todayDate)) > 4) {
        pagerOpacity.value = withRepeat(
          withTiming(0, { duration: 150 }),
          2,
          true
        );
      }
      isProgrammaticChange.value = true
      weekPagerRef.current?.setPage(0, { animated: false })
    })
    return todayUnsubscribe
  }, [])

  const rWeekPagerStyle = useAnimatedStyle(() => {
    return {
      opacity: pagerOpacity.value,
      pointerEvents: bottomSheetTranslationY.value === calendarBottom.value - 235 ? 'auto' : 'none'
    }
  })

  const rPageStyle = useAnimatedStyle(() => {
    return {
      opacity: bottomSheetTranslationY.value === calendarBottom.value - 235 ? 1 : 0
    }
  })

  const WeekPage = ({ index }: { index: number }) => {
    const selectedDatePosition = useSharedValue(0)
    return (
      <Animated.View style={[rPageStyle]} >
        <Week
          initialDay={startOfWeek(addWeeks(calendarState.todayDate, index))}
          selectedDatePosition={selectedDatePosition}
        />
      </Animated.View>
    );
  };
  return (
    <Animated.View style={[styles.weekPagerContainer, { top: paddingTop + 52 }, rWeekPagerStyle]}>
      {/* top = 20 (top inset/paddingTop) + 30 (size of header) + 5 (header margin) + 17 (weekday name text height) */}
      <InfinitePager
        ref={weekPagerRef}
        PageComponent={WeekPage}
        onPageChange={(index) => {
          if (isProgrammaticChange.value === true) {
            isProgrammaticChange.value = false;
            return;
          }
          let date = index === 0 ? calendarState.todayDate : startOfWeek(addWeeks(calendarState.todayDate, index))
          calendarState.selectPreviousDate(calendarState.currentDate)
          calendarState.weekSelectDate(date)
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  weekPagerContainer: {
    position: 'absolute',
    zIndex: 0
  }
})