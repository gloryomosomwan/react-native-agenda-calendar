import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView, SFSymbol } from 'expo-symbols';

import { useTheme } from '@/utils/useTheme';

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
  if (eventType === 'Final Exam' || eventType === 'Midterm' || eventType === 'Quiz') {
    return true;
  }
  return false
}

export default function Event({ event }: EventProps) {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={[styles.startTimeText, { color: theme.text }]}>{event.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
        <Text style={[styles.endTimeText, { color: theme.tertiary }]}>{event.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.accent }]} />
      <View style={styles.courseDetailsContainer}>
        <Text style={[isAssessment(event.type) ? styles.assessmentTypeText : styles.instructionalTypeText, { color: isAssessment(event.type) ? theme.accent : theme.tertiary }]}>{event.type}</Text>
        <View style={styles.courseTitleContainer}>
          <SymbolView name={event.icon} style={[styles.eventIcon]} tintColor={theme.accent} size={25} type="hierarchical" />
          <Text style={[styles.courseTitleText, { color: theme.text }]}>{event.course}</Text>
        </View>
        <View style={styles.courseLocationContainer}>
          <SymbolView name="mappin.circle.fill" style={[styles.locationIcon]} tintColor={theme.accent} type="hierarchical" />
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
  divider: {
    height: '100%',
    width: 3,
    borderRadius: 90,
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
  }
})