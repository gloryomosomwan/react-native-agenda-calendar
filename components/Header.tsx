import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useCalendar } from "./CalendarContext";
import { colors } from '@/utils/styles'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Header() {
  const { calendarState } = useCalendar()
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return dayUnsubscribe
  }), []

  useEffect(() => {
    const weekUnsubscribe = calendarState.weekSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return weekUnsubscribe;
  }, [])

  useEffect(() => {
    const unsubscribe = calendarState.monthSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const todayUnsubscribe = calendarState.todaySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return todayUnsubscribe
  }, [])

  return (
    <View style={[styles.container, { paddingTop: paddingTop }]}>
      <View style={styles.monthTextContainer}>
        <Text style={styles.monthNameText}>{selectedDate.toLocaleString('default', { month: 'long', })}</Text>
        <Text style={styles.monthYearText}>{selectedDate.toLocaleString('default', { year: 'numeric' })}</Text>
      </View>
      <View style={styles.weekdayNamesContainer}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.dayNameText}>{day}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.calendarColor,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  monthNameText: {
    fontSize: 25,
    textAlign: 'center',
    marginRight: 3,
    color: colors.text
  },
  monthYearText: {
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 3,
    color: colors.secondary
  },
  monthTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  weekdayNamesContainer: {
    flexDirection: 'row',
  },
  dayNameText: {
    textAlign: 'center',
    width: Dimensions.get('window').width / 7,
    color: colors.text
  },
})