import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InfinitePager from "react-native-infinite-pager";
import { addDays, addMonths, startOfMonth } from "date-fns"
import { useSharedValue } from "react-native-reanimated";

import Month from '../components/Month'

const today = new Date()
today.setUTCHours(0, 0, 0, 0)
console.log(addDays(today, 1))

export default function App() {

  return (
    <GestureHandlerRootView>
      <View style={styles.flex}>
        <InfinitePager
          PageComponent={Page}
          style={styles.flex}
          pageWrapperStyle={styles.flex}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const Page = ({ index }: { index: number }) => {
  const selectedDatePosition = useSharedValue(0)
  const bottomSheetTranslationY = useSharedValue(0)
  const setCalendarBottom = () => { };

  return (
    <View
      style={[
        styles.flex,
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'white'
        },
      ]}
    >
      <Month
        initialDay={startOfMonth(addMonths(today, index))}
        selectedDatePosition={selectedDatePosition}
        bottomSheetTranslationY={bottomSheetTranslationY}
        setCalendarBottom={setCalendarBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});