import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = (-SCREEN_HEIGHT / 2) + (SCREEN_HEIGHT * 0.145)

type BottomSheetProps = {
  translateY: SharedValue<number>
  calendarBottom: SharedValue<number>
}

export default function BottomSheet({ translateY, calendarBottom }: BottomSheetProps) {
  const scrollTo = useCallback((destination: number) => {
    'worklet'
    translateY.value = withSpring(destination, { damping: 50 })
  }, [])

  const context = useSharedValue({ y: 0 })

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, -235)
      translateY.value = Math.min(translateY.value, 0)
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 4) {
        scrollTo(0)
      }
      else if (translateY.value < -SCREEN_HEIGHT / 4) {
        scrollTo(-235)
      }
    })

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle, { top: calendarBottom }]} >
        <View style={styles.line} />
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#FFF',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  }
})