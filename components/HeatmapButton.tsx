import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/utils/useTheme'
import { useHeatmap } from './HeatmapContext'

export default function HeatmapButton() {
  const { active, setActive } = useHeatmap()
  const theme = useTheme()

  const onPress = () => {
    setActive(!active)
  }

  return (
    <View style={styles.heatmapButtonContainer}>
      <Pressable onPress={onPress} style={({ pressed }) => [
        styles.heatmapButton,
        { borderColor: theme.text, backgroundColor: active ? theme.text : undefined },
        pressed && { opacity: 0.85 }
      ]}>
        <Text style={[styles.heatmapButtonText, { color: active ? theme.inverseText : theme.text }]}>{'H'}</Text>
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