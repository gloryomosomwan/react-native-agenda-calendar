import { DimensionValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView, SFSymbol } from 'expo-symbols';
import { isBefore, isSameDay } from 'date-fns';

import { useTheme } from '@/utils/useTheme';
import { courseColors } from '@/utils/data';
import { useCalendar } from './CalendarContext';

type EventProps = {
  event: {
    type: string,
    course: string,
    icon: SFSymbol,
    location: string,
    start: Date,
    end: Date
  }
}

function isAssessment(eventType: string) {
  if (eventType === 'Exam' || eventType === 'Midterm' || eventType === 'Quiz') {
    return true;
  }
  return false
}

export default function Event({ event }: EventProps) {
  const theme = useTheme()
  const { calendarState } = useCalendar()
  const courseColor = courseColors[event.course as keyof typeof courseColors];
  const eventWasEarlierToday = (() => {
    if (isSameDay(event.start, calendarState.todayDate) && isBefore(event.end, Date.now())) {
      return true
    }
    return false
  })()

  const eventStartMS = event.start.getTime()
  const eventEndMS = event.end.getTime()

  const isHappeningNow = (() => {
    if (Date.now() > eventStartMS && Date.now() < eventEndMS) {
      return true
    }
    return false
  })()

  const dynamicDividerHeightPct: DimensionValue = (() => {
    if (isHappeningNow) {
      let gap = eventEndMS - eventStartMS
      let soFar = Date.now() - eventStartMS
      let percentage = (soFar / gap) * 100
      return `${Math.floor(percentage)}%`
    }
    return '0%'
  })()

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={[styles.startTimeText, { color: eventWasEarlierToday ? theme.tertiary : theme.text }]}>{event.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
        <Text style={[styles.endTimeText, { color: theme.tertiary }]}>{event.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
      </View>
      <View style={styles.dividerContainer}>
        <View style={[styles.staticDivider, { backgroundColor: eventWasEarlierToday ? theme.tertiary : courseColor }]} />
        <View style={[styles.dynamicDivider, { backgroundColor: theme.tertiary, position: 'absolute', height: dynamicDividerHeightPct }]} />
      </View>
      <View style={styles.courseDetailsContainer}>
        <Text style={[isAssessment(event.type) ? styles.assessmentTypeText : styles.instructionalTypeText, { color: isAssessment(event.type) ? courseColor : theme.tertiary }]}>{event.type}</Text>
        <View style={styles.courseTitleContainer}>
          <SymbolView name={event.icon} style={[styles.eventIcon]} tintColor={eventWasEarlierToday ? theme.tertiary : courseColor} size={25} type="hierarchical" />
          <Text style={[styles.courseTitleText, { color: eventWasEarlierToday ? theme.tertiary : theme.text }]}>{event.course}</Text>
        </View>
        <View style={styles.courseLocationContainer}>
          <SymbolView name="mappin.circle.fill" style={[styles.locationIcon]} tintColor={eventWasEarlierToday ? theme.tertiary : courseColor} type="hierarchical" />
          <Text style={[styles.courseLocationText, { color: theme.tertiary }]}>{event.location}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    marginVertical: 5
  },
  timeContainer: {
    width: 60,
    marginRight: 3
  },
  startTimeText: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'right',
  },
  endTimeText: {
    fontSize: 14,
    textAlign: 'right'
  },
  staticDivider: {
    height: '100%',
    width: 3,
    borderRadius: 90,
  },
  dynamicDivider: {
    width: 3,
    borderRadius: 90,
  },
  dividerContainer: {
    height: '100%',
    marginHorizontal: 3,
  },
  courseDetailsContainer: {
    justifyContent: 'space-between',
    marginLeft: 4
  },
  courseTitleContainer: {
    flexDirection: 'row'
  },
  courseTitleText: {
    fontSize: 21,
  },
  courseLocationContainer: {
    flexDirection: 'row'
  },
  courseLocationText: {
    fontSize: 15
  },
  eventIcon: {
    marginRight: 4,
  },
  locationIcon: {
    width: 15,
    height: 20,
    marginRight: 6,
  },
  instructionalTypeText: {
    fontSize: 15
  },
  assessmentTypeText: {
    fontSize: 15,
    fontWeight: '600',
  },
})