import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols';
import tinycolor from 'tinycolor2'

import { colors } from '@/utils/styles'

export default function Activity() {
  return (
    <View style={styles.container}>
      <SymbolView name="circle" style={styles.symbol} size={22} type="monochrome" tintColor={colors.accent} />
      <View style={styles.assignmentDetails}>
        <View style={styles.topRow}>
          <Text style={styles.assignmentName}>{"Buy Textbooks"}</Text>
          <Text style={styles.due}>{"11:00 PM"} </Text>
        </View>
        <View style={styles.tags}>
          <View style={styles.courseTag}>
            <Text style={styles.courseName} >{"MATH 204"}</Text>
          </View>
          <View style={styles.priorityTag}>
            <Text style={styles.priorityLevel} >{"PRIORITY: HIGH"}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  symbol: {
    marginRight: 15,
    height: 22
  },
  assignmentName: {
    fontSize: 20,
  },
  courseName: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.accent,
  },
  priorityLevel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.red,
  },
  tags: {
    alignSelf: 'flex-start',
    marginTop: 6,
    flexDirection: 'row'
  },
  courseTag: {
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: tinycolor(colors.accent).setAlpha(0.15).toRgbString(),
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8
  },
  priorityTag: {
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: tinycolor(colors.red).setAlpha(0.15).toRgbString(),
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignmentDetails: {
    flex: 1,
  },
  due: {
    fontSize: 14,
    color: colors.grey
  }
})