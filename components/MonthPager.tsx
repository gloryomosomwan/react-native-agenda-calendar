import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { addMonths, isAfter, isBefore, startOfMonth } from 'date-fns';
import { useCalendar } from './CalendarContext';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated';

import Month from '@/components/Month'

const today = new Date()
today.setHours(0, 0, 0, 0)

export default function MonthPager() {
  const { calendarState } = useCalendar();
  const monthPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const isProgrammaticChange = useSharedValue(false)

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

  return (
    <GestureHandlerRootView style={{}}>
      <Animated.View animatedProps={animatedProps}>
        <InfinitePager
          ref={monthPagerRef}
          PageComponent={MonthPage}
          // style={styles.flex}
          // pageWrapperStyle={styles.flex}
          onPageChange={(index) => {
            if (isProgrammaticChange.value) {
              isProgrammaticChange.value = false;
              return;
            }
            index === 0 ? calendarState.selectDate(today) : calendarState.selectDate(startOfMonth(addMonths(today, index)))
          }}
        />
      </Animated.View>
    </GestureHandlerRootView>
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