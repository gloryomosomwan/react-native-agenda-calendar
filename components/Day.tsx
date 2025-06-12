import { StyleSheet, Text, View, Pressable, Dimensions, Platform, useColorScheme } from 'react-native'
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { isSameMonth, isSameDay, getWeekOfMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useCalendar } from './CalendarContext';
import { useTheme } from '@/utils/useTheme';
import { Event, Activity, events, assignments, tasks } from '@/utils/data';
import { useHeatmap } from './HeatmapContext'

type DayType = 'week' | 'month'

type DayProps = {
  date: Date;
  firstDayOfMonth: Date;
  selectedDatePosition: SharedValue<number>
  dayType: DayType
}

export default function Day({ date, firstDayOfMonth, selectedDatePosition, dayType }: DayProps) {
  const { calendarState } = useCalendar()
  const { active: heatmapActive } = useHeatmap()
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)
  const elementRef = useRef<View | null>(null)
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const theme = useTheme()

  const isSelectedDay = (() => {
    if (dayType === 'month') {
      if (isSameDay(date, selectedDate) && isSameMonth(date, firstDayOfMonth)) {
        return true
      }
    }
    else if (dayType === 'week') {
      if (isSameDay(date, selectedDate)) {
        return true
      }
    }
    return false
  })()

  const isInactive = (() => {
    if (dayType === 'month') {
      if (!isSameMonth(date, firstDayOfMonth)) {
        return true
      }
    }
    else if (dayType === 'week') {
      if (!isSameMonth(date, selectedDate)) {
        return true
      }
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

  const somethingHappensToday = (() => {
    if (events.some(eventHappensToday) || assignments.some(activityHappensToday) || tasks.some(activityHappensToday)) {
      return true
    }
    return false
  })()

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

  const MAX_ITEMS = 7
  const map01to08 = (t: number) => t * 0.8;
  const eventsOnThisDate = events.filter((event) => isSameDay(event.start, date))
  const opacityPct = map01to08((eventsOnThisDate.length / MAX_ITEMS))

  const scheme = useColorScheme() ?? 'light'
  const darkThemeText = theme.text
  const lightThemeText = heatmapActive ? theme.inverseText : theme.text

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container} ref={elementRef}>
        {isSelectedDay && !heatmapActive && <View style={[styles.selectedDateCircle, { backgroundColor: theme.accent }]} />}
        {isSelectedDay && heatmapActive && <View style={[styles.heatmapSelectedDayCircle, { borderColor: theme.accent }]} />}
        {heatmapActive && !isInactive && <View style={[styles.heatmapCircle, { backgroundColor: theme.accent, opacity: 0.2 + opacityPct }]} />}
        <Text
          style={[
            styles.text,
            { color: scheme === 'light' ? lightThemeText : darkThemeText },
            isInactive && { color: theme.tertiary },
            scheme === 'light' && isSelectedDay && { color: theme.inverseText }
          ]}>
          {date.getDate()}
        </Text>
        {somethingHappensToday && !heatmapActive && !isSelectedDay && <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: theme.tertiary, position: 'absolute', bottom: 4 }} />}
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
  selectedDateCircle: {
    position: 'absolute',
    zIndex: -1,
    width: 34,
    height: 34,
    borderRadius: 100
  },
  heatmapCircle: {
    position: 'absolute',
    zIndex: -1,
    width: 34,
    height: 34,
    borderRadius: 100,
    margin: 8
  },
  heatmapSelectedDayCircle: {
    position: 'absolute',
    zIndex: -1,
    width: 43,
    height: 43,
    borderRadius: 100,
    borderWidth: 2
  },
})