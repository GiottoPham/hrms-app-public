import type { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '@/types/root'

import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Circle } from 'react-native-svg'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { format, intervalToDuration } from 'date-fns'
import { useNavigation } from '@react-navigation/native'
import * as Device from 'expo-device'

import { tw } from '@/lib/tailwind'
import { useHaveCheckedin } from '@/state/checkin-queries'
import { useCurrentUser } from '@/state/auth-queries'
import { useCheckin_outRequest } from '@/state/checkin-mutation'

export const CheckinScreen = () => {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const { width, height } = Dimensions.get('window')
  const { currentUser } = useCurrentUser()
  const { checkedin } = useHaveCheckedin(currentUser?.id as number)
  const R = 800 / (2 * Math.PI)
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const progress = useSharedValue(0)
  // const timeIn = '2022-03-08T01:40:39.468Z'
  const [rate, setRate] = useState<number | null>(null)
  const [timeLapse, setTimeLapse] = useState('00 hours 00 minutes')
  // const rate = (new Date(timeNow).getTime() - new Date(timeIn).getTime()) / (8 * 60 * 60 * 1000)
  useEffect(() => {
    const timer = setInterval(() => {
      const lapse = intervalToDuration({
        start: checkedin == null ? new Date() : new Date(checkedin.timeIn),
        end: new Date(),
      })
      const { hours, minutes, seconds } = lapse
      setTimeLapse(`${hours} hrs ${minutes} mins ${seconds} secs`)
    }, 1000)
    return () => {
      clearInterval(timer) // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, [checkedin])
  useEffect(() => {
    if (checkedin) {
      if (checkedin.checkedIn == true) {
        const newRate =
          (new Date().getTime() - new Date(checkedin.timeIn).getTime()) / (8 * 60 * 60 * 1000)
        setRate(newRate)
        progress.value = withTiming(newRate, { duration: 2000 })
        // console.log('this is rate:' + newRate)
      }
    }
  }, [checkedin])
  const check_outInput = {
    userId: currentUser?.id as number,
    deviceId: Device.deviceName as string,
    date: new Date().toISOString(),
    timeOut: new Date().toISOString(),
  }
  const { sendCheckin_outRequest } = useCheckin_outRequest()
  const handleCheckout = () => {
    sendCheckin_outRequest(check_outInput)
    // navigation.navigate('BottomTabs', {
    //   screen: 'CheckinBottom',
    //   params: { isChecking: true },
    // })
  }
  // useEffect(() => {
  //   const timeNow = '2022-03-08T06:10:38.468Z'
  //   const timeIn = '2022-03-08T03:10:38.468Z'

  //   // if (checkedin?.checkedIn == true) {
  //   //   setRate((new Date(timeNow).getTime() - new Date(timeIn).getTime()) / (8 * 60 * 60 * 1000))
  //   //   progress.value = withTiming(rate, { duration: 2000 })
  //   // }
  // console.log('valueee' + progress.value)
  // }, [])
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 800 * (1 - progress.value),
  }))
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  if (!checkedin && rate == null && progress == null)
    return <ActivityIndicator size="small" color="#0000ff" />
  // console.log(rate)
  return (
    <View style={tw('z-0 h-full relative bg-gray-200 px-6 py-6')}>
      <View style={tw('z-0 bg-white relative h-100 w-90 rounded-3xl')}>
        {checkedin?.checkedIn == false && checkedin.timeOut == null && (
          <>
            <Text style={tw(' absolute right-33 top-28 text-xl')}>You haven't</Text>
            <Text style={tw(' absolute right-28 top-35 text-xl')}>checked in yet !</Text>
            <TouchableOpacity
              style={tw(
                'items-center justify-center absolute mt-2 z-40 bg-green-500 right-31 bottom-43 h-10 w-28 rounded-lg'
              )}
              onPress={() => {
                navigation.navigate('BottomTabs', {
                  screen: 'CheckinMethod',
                  params: { userId: currentUser?.id as number, deviceId: '' },
                })
              }}
            >
              <Text style={tw('text-lg text-white')}>CHECKIN</Text>
            </TouchableOpacity>
          </>
        )}
        {checkedin?.checkedIn == true && checkedin.timeOut == null && (
          <>
            <View>
              <Text style={tw(' absolute right-29 top-25 text-xl font-nunito-bold')}>
                Working Time:
              </Text>
              <Text style={tw(' absolute right-24 top-32 text-xl font-nunito-bold')}>
                {timeLapse}
              </Text>
            </View>
            <TouchableOpacity
              style={tw(
                'items-center justify-center absolute mt-2 z-40 bg-red-500 right-31 bottom-43 h-10 w-28 rounded-lg'
              )}
              onPress={handleCheckout}
            >
              <Text style={tw('text-lg text-white')}>OUT SHIFT</Text>
            </TouchableOpacity>
          </>
        )}
        {checkedin?.checkedIn == true && checkedin.timeOut != null && (
          <>
            <Text style={tw(' absolute right-36 top-28 text-xl')}>You finished</Text>
            <Text style={tw(' absolute right-33 top-35 text-xl')}>your shift !</Text>
          </>
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
          <Text style={tw('font-nunito text-lg text-black')}>
            {weekday[new Date().getDay()]}, {format(new Date(), 'dd/MM/yyyy')}
          </Text>
        </View>
      </View>
    </View>
  )
}
