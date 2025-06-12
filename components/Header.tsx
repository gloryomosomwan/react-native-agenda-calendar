import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useCalendar } from "./CalendarContext";
import { useTheme } from '@/utils/useTheme'
import HeatmapButton from './HeatmapButton';
import { useCalendarAppearance } from './CalendarAppearanceContext';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Header() {
  const { calendarState } = useCalendar()
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)
  const theme = useTheme()
  const { isGradientBackground } = useCalendarAppearance()

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

  const subduedTextColor = isGradientBackground ? '#f7f7f7' : theme.tertiary

  return (
    <View style={[styles.container, { paddingTop: paddingTop, backgroundColor: 'undefined' }]}>
      <View style={styles.topRowContainer}>
        <View style={styles.monthTextContainer}>
          <Text style={[styles.monthNameText, { color: isGradientBackground ? 'white' : theme.text }]}>{selectedDate.toLocaleString('default', { month: 'long', })}</Text>
          <Text style={[styles.monthYearText, { color: subduedTextColor }]}>{selectedDate.toLocaleString('default', { year: 'numeric' })}</Text>
        </View>
        <HeatmapButton />
      </View>
      <View style={styles.weekdayNamesContainer}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={[styles.dayNameText, { color: isGradientBackground ? 'white' : theme.text }]}>{day}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  monthNameText: {
    fontSize: 25,
    textAlign: 'center',
    marginRight: 3,
  },
  monthYearText: {
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 3,
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
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
})