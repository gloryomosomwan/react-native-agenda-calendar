import { StyleSheet, Text, View, Pressable, Dimensions, Platform } from 'react-native'
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { isSameMonth, isSameDay, getWeekOfMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from '@/utils/styles'
import { useCalendar } from './CalendarContext';

type DayType = 'week' | 'month'

type DayProps = {
  date: Date;
  firstDayOfMonth: Date;
  selectedDatePosition: SharedValue<number>
  dayType: DayType
}

export default function Day({ date, firstDayOfMonth, selectedDatePosition, dayType }: DayProps) {
  const { calendarState } = useCalendar()
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)
  const elementRef = useRef<View | null>(null)
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top

  useEffect(() => {
    const unsubscribe = calendarState.weekSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const unsubscribe = calendarState.monthSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return dayUnsubscribe
  }, [])

  useEffect(() => {
    const todayUnsubscribe = calendarState.todaySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return todayUnsubscribe
  }, [])

  useLayoutEffect(() => {
    if (isSameDay(date, selectedDate) && isSameMonth(date, firstDayOfMonth)) {
      selectedDatePosition.value = (paddingTop + 52) + (47 * (getWeekOfMonth(date) - 1))
    }
  })

  const onPress = () => {
    calendarState.selectPreviousDate(calendarState.currentDate)
    calendarState.daySelectDate(date)
  }

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container} ref={elementRef}>
        {
          dayType === 'month' ? (
            <>
              {isSameDay(date, selectedDate) && isSameMonth(date, firstDayOfMonth) && <View style={styles.selectedDateCircle} />}
              <Text style={[styles.text, !isSameMonth(date, firstDayOfMonth) && styles.notInCurrentMonth, isSameDay(date, selectedDate) && isSameMonth(date, firstDayOfMonth) && styles.selectedDate]}>{date.getDate()}</Text>
            </>
          ) : (
            <>
              {isSameDay(date, selectedDate) && <View style={styles.selectedDateCircle} />}
              <Text style={[styles.text, !isSameMonth(date, selectedDate) && styles.notInCurrentMonth, isSameDay(date, selectedDate) && styles.selectedDate]}>{date.getDate()}</Text>
            </>
          )
        }
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 47,
    width: Dimensions.get('window').width / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    color: colors.text
  },
  notInCurrentMonth: {
    color: 'grey',
  },
  selectedDate: {
    color: colors.inverseText
  },
  selectedDateCircle: {
    position: 'absolute',
    backgroundColor: colors.accent,
    zIndex: -1,
    width: 34,
    height: 34,
    borderRadius: 100
  },
})