import type { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList, RootTabParamList } from '@/types/root'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, Text, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import React, { useEffect, useState } from 'react'
import Svg, { Circle } from 'react-native-svg'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'

import { tw } from '@/lib/tailwind'
import { useHaveCheckedin } from '@/state/checkin-queries'
import { useCurrentUser } from '@/state/auth-queries'

export const CheckinScreen = ({ route }: BottomTabScreenProps<RootTabParamList>) => {
  const { width, height } = Dimensions.get('window')
  const { currentUser } = useCurrentUser()
  const { checkedin } = useHaveCheckedin(currentUser?.id as number, new Date().toISOString())
  const R = 800 / (2 * Math.PI)
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const progress = useSharedValue(0)
  // const timeIn = '2022-03-08T01:40:39.468Z'
  const [rate, setRate] = useState(0)
  // const rate = (new Date(timeNow).getTime() - new Date(timeIn).getTime()) / (8 * 60 * 60 * 1000)
  const [isCheckin, setIsCheckin] = useState(false)

  useEffect(() => {
    setIsCheckin(checkedin?.checkedIn == true)
    const timeNow = '2022-03-08T06:10:38.468Z'

    if (checkedin?.checkedIn == true)
      setRate(
        (new Date(timeNow).getTime() -
          new Date(format(new Date(), 'yyyy-MM-dd') + checkedin.timeIn).getTime()) /
          (8 * 60 * 60 * 1000)
      )
    progress.value = withTiming(rate, { duration: 2000 })
  }, [isCheckedin])
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 800 * (1 - progress.value),
  }))
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={tw('z-0 h-full relative bg-gray-200 px-6 py-6')}>
      <View style={tw('z-0 bg-white relative h-100 w-90 rounded-3xl')}>
        {isCheckin == false ? (
          <>
            <Text style={tw(' absolute right-33 top-28 text-xl')}>You haven't</Text>
            <Text style={tw(' absolute right-28 top-35 text-xl')}>checked in yet !</Text>
          </>
        ) : (
          <View>
            <Text style={tw(' absolute right-29 top-25 text-xl font-nunito-bold')}>
              Working Time:
            </Text>
            <Text style={tw(' absolute right-24 top-32 text-xl font-nunito-bold')}>
              4 hours 29 minutes
            </Text>
          </View>
        )}
        {isCheckin == false ? (
          <TouchableOpacity
            style={tw(
              'items-center justify-center absolute mt-2 z-40 bg-green-500 right-31 bottom-43 h-10 w-28 rounded-lg'
            )}
            onPress={() =>
              navigation.navigate('BottomTabs', {
                screen: 'CheckinMethod',
                params: { userId: currentUser?.id as number, deviceId: '' },
              })
            }
          >
            <Text style={tw('text-lg text-white')}>CHECKIN</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw(
              'items-center justify-center absolute mt-2 z-40 bg-red-500 right-31 bottom-43 h-10 w-28 rounded-lg'
            )}
          >
            <Text style={tw('text-lg text-white')}>OUT SHIFT</Text>
          </TouchableOpacity>
        )}
        <Svg style={tw('h-82')}>
          <Circle cx={width / 2.3} cy={height / 4.5} r={R} stroke="#cccccc" strokeWidth={30} />
          <AnimatedCircle
            cx={width / 2.3}
            cy={height / 4.5}
            r={R}
            stroke="#ffbe55"
            strokeWidth={25}
            strokeDasharray={800}
            animatedProps={animatedProps}
            strokeLinecap={'round'}
            transform={`rotate(-90 ${width / 2.3} ${height / 4.5})`}
          />
        </Svg>
        <View
          style={tw(
            'items-center justify-center ml-11 bg-yellow-200 font-nunito h-13 w-70 rounded-3xl'
          )}
        >
          <Text style={tw('font-nunito text-lg text-black')}>Tuesday, 08/03/2022</Text>
        </View>
      </View>
    </View>
  )
}
