import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InfinitePager from "react-native-infinite-pager";
import { addDays, addMonths, startOfMonth } from "date-fns"
import { useSharedValue } from "react-native-reanimated";

import Month from '../components/Month'

const NUM_ITEMS = 50;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = Math.abs(i) * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

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
          // backgroundColor: getColor(index),
          backgroundColor: 'white'
        },
      ]}
    >
      {/* <Text style={{ color: "white", fontSize: 80 }}>{addDays(today, index).toDateString()}</Text> */}
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