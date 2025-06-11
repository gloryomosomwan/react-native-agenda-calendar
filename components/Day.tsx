import { StyleSheet, Text, View, Pressable, Dimensions, Platform } from 'react-native'
import React, { useRef, useLayoutEffect, useEffect, useState, useMemo } from 'react'
import { isSameMonth, isSameDay, getWeekOfMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCalendar } from './CalendarContext';
import { useTheme } from '@/utils/useTheme';
import { Event, Activity, events, assignments, tasks } from '@/utils/data';

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
  const theme = useTheme()

  const isSelectedDay = (() => {
    if (dayType === 'month') {
      if (isSameDay(date, selectedDate) && isSameMonth(date, firstDayOfMonth)) { return true }
    }
    else if (dayType === 'week') {
      if (isSameDay(date, selectedDate)) { return true }
    }
    return false
  })()

  const eventHappensToday = (event: Event) => {
    if (isSameDay(event.start, date)) {
      return true;
    }
    else {
      return false;
    }
  }

  const activityHappensToday = (activity: Activity) => {
    if (activity.due) {
      if (isSameDay(activity.due, date)) {
        return true;
      }
    }
    else {
      return false;
    }
  }

  const doesSomethingHappenToday = () => {
    if (events.some(eventHappensToday) || assignments.some(activityHappensToday) || tasks.some(activityHappensToday)) {
      return true
    }
    return false
  }

  const somethingHappensToday = doesSomethingHappenToday()

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
              {isSelectedDay && <View style={[styles.selectedDateCircle, { backgroundColor: theme.accent }]} />}
              <Text
                style={[
                  styles.text,
                  { color: theme.text },
                  !isSameMonth(date, firstDayOfMonth) && { color: theme.tertiary },
                  isSameDay(date, selectedDate) && isSameMonth(date, firstDayOfMonth) && { color: theme.inverseText },
                ]}>
                {date.getDate()}
              </Text>
              {somethingHappensToday && !isSelectedDay && <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: theme.tertiary, position: 'absolute', bottom: 3 }} />}
            </>
          ) : (
            <>
              {isSameDay(date, selectedDate) && <View style={[styles.selectedDateCircle, { backgroundColor: theme.accent }]} />}
              <Text style={[
                styles.text,
                { color: theme.text },
                !isSameMonth(date, selectedDate) && { color: theme.tertiary },
                isSameDay(date, selectedDate) && { color: theme.inverseText }
              ]}>
                {date.getDate()}
              </Text>
              {somethingHappensToday && !isSelectedDay && <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: theme.tertiary, position: 'absolute', bottom: 5 }} />}
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
  },
  notInCurrentMonth: {
  },
  selectedDate: {
  },
  selectedDateCircle: {
    position: 'absolute',
    zIndex: -1,
    width: 34,
    height: 34,
    borderRadius: 100
  },
})