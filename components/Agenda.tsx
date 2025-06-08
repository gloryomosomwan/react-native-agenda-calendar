import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import Event from "@/components/Event";
import Activity from "@/components/Activity";

type AgendaProps = {
  bottomSheetTranslationY: SharedValue<number>
}

export default function Agenda({ bottomSheetTranslationY }: AgendaProps) {
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const initialCalendarBottom = (47 * 6) + paddingTop + 52
  const { height } = useWindowDimensions();
  const snapPoints = useMemo(() => [height - initialCalendarBottom, height - initialCalendarBottom + 235], []);

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
    >
      <BottomSheetScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionHeadingText}>{"Schedule"}</Text>
          <Event />
          <Event />
          <Event />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeadingText}>{"Assignments"}</Text>
          <Activity />
          <Activity />
          <Activity />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeadingText}>{"Tasks"}</Text>
          <Activity />
          <Activity />
          <Activity />
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
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionHeadingText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 4
  }
})