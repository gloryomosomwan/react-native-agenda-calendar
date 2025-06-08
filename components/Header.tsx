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
    <View style={[styles.header, { paddingTop: paddingTop }]}>
      <View style={styles.monthText}>
        <Text style={styles.monthName}>{selectedDate.toLocaleString('default', { month: 'long', })}</Text>
        <Text style={styles.monthYear}>{selectedDate.toLocaleString('default', { year: 'numeric' })}</Text>
      </View>
      <View style={styles.weekdayNames}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.dayName}>{day}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.calendarColor,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  monthName: {
    fontSize: 25,
    textAlign: 'center',
    marginRight: 3
  },
  monthYear: {
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 3,
    color: colors.grey
  },
  monthText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  weekdayNames: {
    flexDirection: 'row',
  },
  dayName: {
    textAlign: 'center',
    width: Dimensions.get('window').width / 7,
  },
})