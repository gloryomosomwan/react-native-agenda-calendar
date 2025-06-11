import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { isSameDay } from 'date-fns';

import Event from "@/components/Event";
import Activity from "@/components/Activity";
import { events, assignments, tasks } from '@/utils/data'
import { useTheme } from '@/utils/useTheme'
import { useCalendar } from './CalendarContext';

type AgendaProps = {
  bottomSheetTranslationY: SharedValue<number>
}

export default function Agenda({ bottomSheetTranslationY }: AgendaProps) {
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const initialCalendarBottom = (47 * 6) + paddingTop + 52
  const { height } = useWindowDimensions();
  const snapPoints = useMemo(() => [height - initialCalendarBottom, height - initialCalendarBottom + 235], []);
  const theme = useTheme()
  const { calendarState } = useCalendar()
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)

  const currentEvents = events.filter((event) => isSameDay(event.start, calendarState.currentDate))
  const currentEventElements = currentEvents.map(event => <Event key={event.id} event={event} />)

  const isActivityCurrent = (activity: any) => {
    if (activity.due) {
      if (isSameDay(activity.due, calendarState.currentDate)) {
        return true
      }
    }
    return false
  }

  const currentAssignments = assignments.filter(isActivityCurrent)
  const currentAssignmentElements = currentAssignments.map(assignment => <Activity key={assignment.id} activity={assignment} />)

  const currentTasks = tasks.filter(isActivityCurrent)
  const currentTaskElements = currentTasks.map(task => <Activity key={task.id} activity={task} />)

  useEffect(() => {
    const unsubscribe = calendarState.weekSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const unsubscribe = calendarState.monthSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return dayUnsubscribe
  }, [])

  useEffect(() => {
    const todayUnsubscribe = calendarState.todaySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return todayUnsubscribe
  }, [])

  return (
    <BottomSheet
      index={1}
      snapPoints={snapPoints}
      animatedPosition={bottomSheetTranslationY}
      enableOverDrag={false}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: theme.primary }}
      animateOnMount={false}
      // enableContentPanningGesture={false}
      style={styles.bottomSheet}
      handleStyle={[styles.handleStyle, { backgroundColor: theme.primary }]}
      handleIndicatorStyle={{ backgroundColor: theme.tertiary }}
    >
      <BottomSheetScrollView style={{ backgroundColor: theme.primary }}>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Schedule"}</Text>
          {currentEvents.length > 0 ? currentEventElements : <Text style={[styles.placeholderText, { color: theme.tertiary }]} >{"No events"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Assignments"}</Text>
          {currentAssignments.length > 0 ? currentAssignmentElements : <Text style={[styles.placeholderText, { color: theme.tertiary }]} >{"No assignments"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Tasks"}</Text>
          {currentTasks.length > 0 ? currentTaskElements : <Text style={[styles.placeholderText, { color: theme.tertiary }]} >{"No tasks"}</Text>}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    zIndex: 3,
  },
  handleStyle: {
    borderRadius: 25,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionHeadingText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 4,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '400'
  }
})