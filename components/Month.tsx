import { Platform, StyleSheet, View, Text } from 'react-native'
import React, { memo } from 'react'
import { startOfMonth, addDays, subDays, getDay, getDaysInMonth, isSameMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Day from './Day'

type MonthProps = {
  initialDay: Date
  selectedDatePosition: SharedValue<number>
  setCalendarBottom: (y: number) => void
  bottomSheetTranslationY: SharedValue<number>
}

export default function Month({ initialDay, selectedDatePosition, setCalendarBottom, bottomSheetTranslationY }: MonthProps) {
  const dates = getDates(initialDay)
  const paddedDates = padDatesArray(dates)
  const daysArray = createDays(paddedDates, initialDay, selectedDatePosition, bottomSheetTranslationY)
  const weeks = createWeeks(daysArray)
  const insets = useSafeAreaInsets()

  let topPadding = 0;

  if (Platform.OS === 'android') {
    topPadding = 0
  }
  else if (Platform.OS === 'ios') {
    topPadding = insets.top
  }

  return (
    <View style={styles.container}
      onLayout={(e) => {
        let bottom = e.nativeEvent.layout.height + topPadding
        setCalendarBottom(bottom)
      }}
    >
      <View style={styles.weeks}>
        {/* <Text style={{ left: 130, color: 'blue' }}>{initialDay.toDateString()}</Text> */}
        {weeks.map((week, index) => (
          <View key={index} style={styles.week}>
            {week}
          </View>
        ))}
      </View>
    </View>
  )
}

function getDates(initialDay: Date) {
  const numDaysInMonth = getDaysInMonth(initialDay)
  let firstDay = startOfMonth(initialDay)
  let dates = []
  let currentDay = firstDay
  for (let i = 0; i < numDaysInMonth; i++) {
    dates.push(currentDay)
    currentDay = addDays(currentDay, 1)
  }
  return dates
}

function createDays(dates: Date[], initialDay: Date, selectedDatePosition: SharedValue<number>, bottomSheetTranslationY: SharedValue<number>) {
  let days: JSX.Element[] = []
  dates.map((date) => {
    days.push(
      <Day key={date.toDateString()}
        date={date}
        firstDayOfMonth={initialDay}
        selectedDatePosition={selectedDatePosition}
        bottomSheetTranslationY={bottomSheetTranslationY}
        dayType='month'
      />
    )
  })
  return days
}

function padDatesArray(dates: Date[]) {
  let firstDay = dates[0]
  let dayOfFirstDay = getDay(dates[0])
  let i = dayOfFirstDay
  let currentDay = firstDay
  while (i > 0) {
    currentDay = subDays(currentDay, 1)
    dates.unshift(currentDay)
    i--
  }
  let lastDay = dates[dates.length - 1]
  while (dates.length < 42) {
    lastDay = addDays(lastDay, 1)
    dates.push(lastDay)
  }
  return dates
}

function createWeeks(daysArray: React.ReactNode[]) {
  let weeks = []
  for (let i = 0; i < 6; i++) {
    let week = []
    for (let j = 0; j < 7; j++) {
      let day = daysArray.shift()
      week.push(day)
    }
    weeks.push(week)
  }
  return weeks
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: '100%',
    width: '100%',
    // paddingTop: 102,
  },
  week: {
    flexDirection: 'row',
  },
  weeks: {},
})