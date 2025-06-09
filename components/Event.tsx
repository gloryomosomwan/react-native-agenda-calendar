import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView, SFSymbol } from 'expo-symbols';

import { colors } from '@/utils/styles'

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

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.startTimeText}>{event.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
        <Text style={styles.endTimeText}>{event.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.courseDetailsContainer}>
        <Text style={isAssessment(event.type) ? styles.assessmentTypeText : styles.instructionalTypeText}>{event.type}</Text>
        <View style={styles.courseTitleContainer}>
          <SymbolView name={event.icon} style={styles.eventIcon} size={25} tintColor={colors.accent} type="hierarchical" />
          <Text style={styles.courseTitleText}>{event.course}</Text>
        </View>
        <View style={styles.courseLocationContainer}>
          <SymbolView name="mappin.circle.fill" style={styles.locationIcon} tintColor={colors.secondary} type="hierarchical" />
          <Text style={styles.courseLocationText}>{event.location}</Text>
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
    color: colors.text
  },
  endTimeText: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'right'
  },
  divider: {
    backgroundColor: colors.accent,
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
    color: colors.text
  },
  courseLocationContainer: {
    flexDirection: 'row'
  },
  courseLocationText: {
    color: colors.secondary,
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
    color: colors.secondary,
    fontSize: 15
  },
  assessmentTypeText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.accent
  }
})