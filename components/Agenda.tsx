import { Platform, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import Event from "@/components/Event";
import Activity from "@/components/Activity";
import { events, assignments, tasks } from '@/utils/data'
import { colors } from '@/utils/styles';

type AgendaProps = {
  bottomSheetTranslationY: SharedValue<number>
}

export default function Agenda({ bottomSheetTranslationY }: AgendaProps) {
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const initialCalendarBottom = (47 * 6) + paddingTop + 52
  const { height } = useWindowDimensions();
  const snapPoints = useMemo(() => [height - initialCalendarBottom, height - initialCalendarBottom + 235], []);
  const eventElements = events.map(event => <Event key={event.id} event={event} />)
  const assignmentElements = assignments.map(assignment => <Activity key={assignment.id} activity={assignment} />)
  const taskElements = tasks.map(task => <Activity key={task.id} activity={task} />)

  return (
    <BottomSheet
      index={1}
      snapPoints={snapPoints}
      animatedPosition={bottomSheetTranslationY}
      enableOverDrag={false}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      animateOnMount={false}
      style={styles.bottomSheet}
      handleStyle={styles.handleStyle as ViewStyle}
    >
      <BottomSheetScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionHeadingText}>{"Schedule"}</Text>
          {eventElements}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeadingText}>{"Assignments"}</Text>
          {assignmentElements}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeadingText}>{"Tasks"}</Text>
          {taskElements}
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
  scrollView: {
    backgroundColor: colors.primary
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionHeadingText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 4,
    color: colors.text
  },
  handleStyle: {
    backgroundColor: colors.primary
  }
})