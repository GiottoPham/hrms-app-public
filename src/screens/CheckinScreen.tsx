import { View, Text, ImageBackground } from 'react-native'

import { tw } from '@/lib/tailwind'
export const CheckinScreen = () => {
  return (
    <View style={tw('flex flex-1 bg-white font-nunito text-white')}>
      <ImageBackground
        source={require('@/assets/images/iOS-7-dark-mod-iphone-wallpaper-ar72014-768x1662.jpeg')}
        resizeMode="cover"
        style={tw('h-full w-full flex justify-center items-center')}
      >
        <Text>Login Viewasdasd</Text>
      </ImageBackground>
    </View>
  )
}
