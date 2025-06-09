import { Platform, Pressable, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { isSameDay, isSameMonth, isSameWeek } from 'date-fns'

import { useCalendar } from './CalendarContext'
import tinycolor from 'tinycolor2'
import { SymbolView } from 'expo-symbols'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/utils/useTheme'

type TodayButtonProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
}

export default function TodayButton({ bottomSheetTranslationY, calendarBottom }: TodayButtonProps) {
  const { calendarState } = useCalendar()
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const isSelectedToday = useSharedValue(true)
  const theme = useTheme()

  useEffect(() => {
    isSelectedToday.value = isSameDay(calendarState.currentDate, calendarState.todayDate)
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
    let opacity;
    let fadeOut = withTiming(0, { duration: 100 })
    let fadeIn = withTiming(1, { duration: 100 })
    if (isSelectedToday.value) {
      opacity = fadeOut
    }
    else {
      opacity = fadeIn
    }
    return {
      opacity: opacity,
      pointerEvents: bottomSheetTranslationY.value === calendarBottom.value - 235 || bottomSheetTranslationY.value === calendarBottom.value ? "auto" : "none"
    }
  })

  return (
    <Animated.View style={[todayButtonStyle, styles.todayButtonView, { top: paddingTop }]}>
      <Pressable onPress={setToday} style={({ pressed }) => [
        styles.todayButtonContainer,
        { backgroundColor: tinycolor(theme.accent).setAlpha(0.15).toRgbString() },
        pressed && { opacity: 0.9 }
      ]}>
        <SymbolView name="arrow.uturn.backward" style={styles.icon} size={12} type="monochrome" tintColor={theme.accent} />
        <Text style={[styles.todayText, { color: theme.accent }]}>{'TODAY'}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  todayButtonView: {
    position: 'absolute',
    zIndex: 3,
    right: 20,
    justifyContent: 'center',
    height: 30,
  },
  todayButtonContainer: {
    height: 20,
    width: 65,
    flexDirection: 'row',
    // backgroundColor: tinycolor(colors.accent).setAlpha(0.15).toRgbString(),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todayText: {
    fontSize: 12,
    // color: colors.accent,
  },
  icon: {
    marginRight: 4
  },
})