import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols';

export default function Activity() {
  return (
    <View style={styles.container}>
      <SymbolView name="circle" style={styles.symbol} size={22} type="hierarchical" />
      <View style={styles.assignmentDetails}>
        <View style={styles.topRow}>
          <Text style={styles.assignmentName}>{"Buy Textbooks"}</Text>
          <Text style={styles.due}>{"11:00 PM"} </Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.courseName} >{"MATH 204"}</Text>
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
    fontSize: 10,
    fontWeight: '700',
    color: '#007bff',
  },
  tag: {
    borderColor: '#007bff',
    borderWidth: 1,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,123,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6
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
    color: "#bcbec4"
  }
})