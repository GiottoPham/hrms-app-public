import type { ImageProps as TImageProps } from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { View } from 'react-native'

import { tw } from '@/lib/tailwind'

type ImageProps = TImageProps & {
  aspectRatio: number
}

export const Image = ({ source, aspectRatio, onLoad, resizeMode = 'cover' }: ImageProps) => {
  const opacity = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })
  return (
    <View style={tw('flex flex-row w-full')}>
      <Animated.Image
        source={source}
        resizeMode={resizeMode}
        style={[
          {
            flex: 1,
            aspectRatio,
          },
          animatedStyles,
        ]}
        onLoad={(e) => {
          opacity.value = withTiming(1)
          if (onLoad) {
            onLoad(e)
          }
        }}
      />
    </View>
  )
}
