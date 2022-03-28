import { ScrollView, View, Text, ImageBackground } from 'react-native'
import React from 'react'

import { tw } from '@/lib/tailwind'
export const NotiScreen = () => {
  return (
    <View style={tw('flex flex-1 bg-gray-100')}>
      <ImageBackground
        source={require('@/assets/images/inprogress.png')}
        resizeMode="stretch"
        style={tw('mt-40 h-50 w-full flex justify-center items-center')}
      />
    </View>
  )
}
