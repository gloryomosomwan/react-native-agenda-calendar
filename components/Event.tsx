import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols';

export default function Event() {
  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text style={styles.startTime}>{"8:00 AM"} </Text>
        <Text style={styles.endTime}>{"9:00 AM"} </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.courseDetails}>
        <View style={styles.courseTitle}>
          <SymbolView name="function" style={styles.courseSymbol} size={29} type="hierarchical" />
          <Text style={styles.courseTitleText}>{"MATH 204"}</Text>
        </View>
        <View style={styles.courseLocation}>
          <SymbolView name="mappin.circle.fill" style={styles.locationSymbol} tintColor="grey" type="hierarchical" />
          <Text style={styles.courseLocationText}>{"A-101"}</Text>
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
    color: '#bcbec4'
  },
  divider: {
    backgroundColor: '#007bff',
    height: '100%',
    width: 3,
    borderRadius: 90,
    marginHorizontal: 3,
    // opacity: 0.5
  },
  courseDetails: {
    justifyContent: 'space-between',
    marginLeft: 4
  },
  courseTitle: {
    // justifyContent: 'flex-start'
    flexDirection: 'row'
  },
  courseTitleText: {
    fontSize: 21
  },
  courseLocation: {
    flexDirection: 'row'
  },
  courseLocationText: {
    color: '#bcbec4',
    fontSize: 15
  },
  courseSymbol: {
    marginRight: 4,
  },
  locationSymbol: {
    width: 15,
    height: 20,
    marginRight: 6,
  },
})