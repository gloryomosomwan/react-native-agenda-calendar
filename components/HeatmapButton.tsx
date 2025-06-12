import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/utils/useTheme'
import { useCalendarAppearance } from './CalendarAppearanceContext'

export default function HeatmapButton() {
  const { heatmapActive, setHeatmapActive, isGradientBackground } = useCalendarAppearance()
  const theme = useTheme()

  const onPress = () => {
    setHeatmapActive(!heatmapActive)
  }

  return (
    <View style={styles.heatmapButtonContainer}>
      <Pressable onPress={onPress} style={({ pressed }) => [
        styles.heatmapButton,
        { borderColor: theme.text, backgroundColor: heatmapActive ? theme.text : undefined },
        isGradientBackground && { borderColor: 'white', backgroundColor: heatmapActive ? 'white' : undefined },
        pressed && { opacity: 0.85 }
      ]}>
        <Text style={[
          styles.heatmapButtonText, { color: heatmapActive ? theme.inverseText : theme.text },
          isGradientBackground && { color: heatmapActive ? 'black' : 'white' }
        ]}>{'H'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  heatmapButtonContainer: {
    position: 'absolute',
    left: 25,
    height: '100%',
    justifyContent: 'center'
  },
  heatmapButton: {
    borderWidth: 1.55,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  heatmapButtonText: {
    fontWeight: '600'
  },
})