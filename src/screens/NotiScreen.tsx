import { ScrollView, View, Text, ImageBackground } from 'react-native'

import { tw } from '@/lib/tailwind'
import React from 'react'
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
