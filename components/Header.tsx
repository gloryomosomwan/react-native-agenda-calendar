import { StyleSheet, Text, View, Dimensions, Platform, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCalendar } from "./CalendarContext";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';

import { calendarColor } from '@/utils/styles'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type HeaderProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
}

export default function Header({ bottomSheetTranslationY, calendarBottom }: HeaderProps) {
  const { calendarState } = useCalendar()
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)
  const isTodayMonth = useSharedValue(true)
  const isTodayWeek = useSharedValue(true)

  useEffect(() => {
    isTodayWeek.value = isSameWeek(calendarState.currentDate, calendarState.todayDate)
    isTodayMonth.value = isSameMonth(calendarState.currentDate, calendarState.todayDate)
  }, [selectedDate])

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

  const setToday = () => {
    if (isSameDay(calendarState.currentDate, calendarState.todayDate)) return;
    calendarState.selectPreviousDate(calendarState.currentDate)
    calendarState.selectToday()
  }

  const todayButtonStyle = useAnimatedStyle(() => {
    let opacity = 0
    if ((isTodayWeek.value === false && bottomSheetTranslationY.value === calendarBottom.value - 235) || (isTodayMonth.value === false && bottomSheetTranslationY.value === calendarBottom.value)) {
      opacity = 1
    }
    return {
      opacity: opacity,
      pointerEvents: bottomSheetTranslationY.value === calendarBottom.value - 235 || bottomSheetTranslationY.value === calendarBottom.value ? "auto" : "none"
    }
  })

  return (
    <View style={[styles.header, { paddingTop: paddingTop }]}>
      <Text style={styles.monthName}>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</Text>
      <Animated.View style={[todayButtonStyle, { position: 'absolute', top: 15, zIndex: 1, left: 280 }]}>
        <Button title='Today' onPress={setToday} />
      </Animated.View>
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
    backgroundColor: calendarColor,
    position: 'absolute',
    zIndex: 1,
  },
  monthName: {
    fontSize: 25,
    textAlign: 'center',
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