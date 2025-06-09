import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView, SFSymbol } from 'expo-symbols';

import { colors } from '@/utils/styles'

type EventProps = {
  data: { type: string, course: string, icon: SFSymbol, location: string, start: Date, end: Date }
}

export default function Event({ data }: EventProps) {
  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text style={styles.startTime}>{data.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
        <Text style={styles.endTime}>{data.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.courseDetails}>
        <View style={styles.courseTitle}>
          <SymbolView name={data.icon} style={styles.icon} size={29} tintColor={colors.accent} type="hierarchical" />
          <Text style={styles.courseTitleText}>{data.course}</Text>
        </View>
        <View style={styles.courseLocation}>
          <SymbolView name="mappin.circle.fill" style={styles.locationSymbol} tintColor={colors.grey} type="hierarchical" />
          <Text style={styles.courseLocationText}>{data.location}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    marginVertical: 5
  },
  time: {},
  startTime: {
    fontSize: 14,
    marginBottom: 2
  },
  endTime: {
    fontSize: 14,
    color: colors.grey
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
})