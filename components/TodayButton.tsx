import { Pressable, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { isSameDay, isSameMonth, isSameWeek } from 'date-fns'

import { useCalendar } from './CalendarContext'
import { colors } from '@/utils/styles'

type TodayButtonProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
}

export default function TodayButton({ bottomSheetTranslationY, calendarBottom }: TodayButtonProps) {
  const { calendarState } = useCalendar()
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)
  const isTodayMonth = useSharedValue(true)
  const isTodayWeek = useSharedValue(true)
  const abbreviatedMonth = calendarState.todayDate.toLocaleString('default', { month: 'short' }).toUpperCase()
  const twoDigitDate = calendarState.todayDate.toLocaleString('default', { day: '2-digit' })

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
    <Animated.View style={[todayButtonStyle, styles.todayButtonView]}>
      <Pressable onPress={setToday} style={({ pressed }) => [
        styles.todayButtonContainer,
        pressed && { opacity: 0.6 },
      ]}>
        <Text style={styles.todayButtonMonth}>{abbreviatedMonth}</Text>
        <Text style={styles.todayButtonDate}>{twoDigitDate}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  todayButtonView: {
    position: 'absolute',
    bottom: 50,
    zIndex: 2,
    right: 40
  },
  todayButtonContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayButtonMonth: {
    fontSize: 13,
    color: colors.accent
  },
  todayButtonDate: {
    fontSize: 25,
    color: colors.accent
  }
})