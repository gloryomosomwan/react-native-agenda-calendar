import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InfinitePager from "react-native-infinite-pager";
import { addDays } from "date-fns"

const NUM_ITEMS = 50;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = Math.abs(i) * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const today = new Date()
today.setUTCHours(0, 0, 0, 0)
console.log(addDays(today, 1))

const Page = ({ index }: { index: number }) => {
  return (
    <View
      style={[
        styles.flex,
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: getColor(index),
        },
      ]}
    >
      <Text style={{ color: "white", fontSize: 80 }}>{addDays(today, index).toDateString()}</Text>
    </View>
  );
};

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

const styles = StyleSheet.create({
  flex: { flex: 1 },
});