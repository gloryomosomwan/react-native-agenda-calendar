import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols';
import tinycolor from 'tinycolor2'

import { colors } from '@/utils/styles'

type ActivityProps = {
  activity: {
    title: string;
    course?: string;
    due?: Date;
    priority?: string
  }
}

export default function Activity({ activity }: ActivityProps) {
  return (
    <View style={styles.container}>
      <SymbolView name="circle" style={styles.symbol} size={22} type="monochrome" tintColor={colors.accent} />
      <View style={styles.assignmentDetails}>
        <View style={styles.topRow}>
          <Text style={styles.assignmentName}>{activity.title}</Text>
          {activity.due && <Text>{activity.due.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}</Text>}
        </View>
        <View style={styles.tags}>
          {activity.course &&
            <View style={styles.courseTag}>
              <Text style={styles.courseName}>{activity.course}</Text>
            </View>
          }
          {activity.priority &&
            <View style={[activity.priority === 'high' && styles.highPriorityTagContainer, activity.priority === 'medium' && styles.mediumPriorityTagContainer, activity.priority === 'low' && styles.lowPriorityTagContainer]}>
              {<Text style={[activity.priority === 'high' && styles.highPriorityTagText, activity.priority === 'medium' && styles.mediumPriorityTagText, activity.priority === 'low' && styles.lowPriorityTagText]} >{'PRIORITY: ' + activity.priority.toUpperCase()}</Text>}
            </View>
          }
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
  },

  // High
  highPriorityTagContainer: {
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: tinycolor(colors.red).setAlpha(0.15).toRgbString(),
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  highPriorityTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.red,
  },

  // Medium 
  mediumPriorityTagContainer: {
    borderColor: colors.warning,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: tinycolor(colors.warning).setAlpha(0.15).toRgbString(),
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  mediumPriorityTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.warning,
  },

  // Low 
  lowPriorityTagContainer: {
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: tinycolor(colors.accent).setAlpha(0.15).toRgbString(),
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  lowPriorityTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.accent,
  },
})