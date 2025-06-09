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
        <Text style={styles.startTime}>{event.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
        <Text style={styles.endTime}>{event.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.courseDetails}>

        <Text style={isAssessment(event.type) ? styles.assessmentType : styles.instructionalType}>{event.type}</Text>

        <View style={styles.courseTitle}>
          <SymbolView name={event.icon} style={styles.icon} size={25} tintColor={colors.accent} type="hierarchical" />
          <Text style={styles.courseTitleText}>{event.course}</Text>
        </View>
        <View style={styles.courseLocation}>
          <SymbolView name="mappin.circle.fill" style={styles.locationSymbol} tintColor={colors.grey} type="hierarchical" />
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
    // marginRight: 3
  },
  startTime: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'right'
  },
  endTime: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'right'
  },
  divider: {
    backgroundColor: colors.accent,
    height: '100%',
    width: 3,
    borderRadius: 90,
    marginHorizontal: 3,
  },
  courseDetails: {
    justifyContent: 'space-between',
    marginLeft: 4
  },
  courseTitle: {
    flexDirection: 'row'
  },
  courseTitleText: {
    fontSize: 21
  },
  courseLocation: {
    flexDirection: 'row'
  },
  courseLocationText: {
    color: colors.grey,
    fontSize: 15
  },
  icon: {
    marginRight: 4,
  },
  locationSymbol: {
    width: 15,
    height: 20,
    marginRight: 6,
  },
  instructionalType: {
    color: colors.grey,
    fontSize: 15
  },
  assessmentType: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.accent
  }
})