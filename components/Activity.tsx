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
      <View style={styles.activityDetailsContainer}>
        <View style={styles.topRowContainer}>
          <Text style={styles.activityTitleText}>{activity.title}</Text>
          {activity.due &&
            <Text style={styles.activityDueText}>
              {activity.due.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}
            </Text>}
        </View>
        <View style={styles.tagsContainer}>
          {activity.course &&
            <View style={styles.courseTagContainer}>
              <Text style={styles.courseNameText}>{activity.course}</Text>
            </View>
          }
          {activity.priority &&
            <View style={[
              styles.priorityTagContainer,
              activity.priority === 'high' && styles.highPriorityTagContainer,
              activity.priority === 'medium' && styles.mediumPriorityTagContainer,
              activity.priority === 'low' && styles.lowPriorityTagContainer
            ]}>
              {<Text style={[
                styles.priorityTagText,
                activity.priority === 'high' && styles.highPriorityTagText,
                activity.priority === 'medium' && styles.mediumPriorityTagText,
                activity.priority === 'low' && styles.lowPriorityTagText
              ]} >
                {'PRIORITY: ' + activity.priority.toUpperCase()}
              </Text>}
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
  activityTitleText: {
    fontSize: 20,
    color: colors.text
  },
  courseNameText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.accent,
  },
  tagsContainer: {
    alignSelf: 'flex-start',
    marginTop: 6,
    flexDirection: 'row'
  },
  courseTagContainer: {
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: tinycolor(colors.accent).setAlpha(0.15).toRgbString(),
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityDetailsContainer: {
    flex: 1,
  },
  activityDueText: {
    fontSize: 14,
    color: colors.text
  },

  priorityTagContainer: {
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  priorityTagText: {
    fontSize: 9,
    fontWeight: '700',
  },

  // High
  highPriorityTagContainer: {
    borderColor: colors.danger,
    backgroundColor: tinycolor(colors.danger).setAlpha(0.15).toRgbString(),
  },
  highPriorityTagText: {
    color: colors.danger,
  },

  // Medium 
  mediumPriorityTagContainer: {
    borderColor: colors.warning,
    backgroundColor: tinycolor(colors.warning).setAlpha(0.15).toRgbString(),
  },
  mediumPriorityTagText: {
    color: colors.warning,
  },

  // Low 
  lowPriorityTagContainer: {
    borderColor: colors.accent,
    backgroundColor: tinycolor(colors.accent).setAlpha(0.15).toRgbString(),
  },
  lowPriorityTagText: {
    color: colors.accent,
  },
})