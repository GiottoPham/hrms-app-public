import type { RootStackParamList } from '@/types/root'
import type { StackNavigationProp } from '@react-navigation/stack'

import { useNavigation } from '@react-navigation/native'
import {
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardEvent,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'

import { tw } from '@/lib/tailwind'
import { LogoIcon } from '@/assets/icons/LogoIcon'
export const AuthScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [username, setUsername] = useState('')
  const handleChangeUsername = (newText: string) => setUsername(newText)
  const [password, setPassword] = useState('')
  const handleChangePassword = (newText: string) => setPassword(newText)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  function onKeyboardDidShow(e: KeyboardEvent) {
    // Remove type here if not using TypeScript
    setKeyboardHeight(e.endCoordinates.height)
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0)
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw('flex flex-1 bg-white font-nunito text-white')}>
        <ImageBackground
          source={require('@/assets/images/iOS-7-dark-mod-iphone-wallpaper-ar72014-768x1662.jpeg')}
          resizeMode="cover"
          style={tw('h-full w-full flex justify-center items-center')}
        >
          <LogoIcon />
          <TextInput
            value={username}
            placeholder={'Username'}
            textAlignVertical="center"
            onChangeText={handleChangeUsername}
            style={tw('rounded-lg bg-white font-nunito text-sm px-4 py-4 w-2/3 h-12 mt-5')}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            placeholder={'Password'}
            onChangeText={handleChangePassword}
            style={tw('rounded-lg bg-white font-nunito text-sm px-4 py-4 w-2/3 h-12 mt-5')}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={tw(
              'flex flex-row items-center justify-center bg-white rounded-lg w-20 h-10 mt-5 bg-primary'
            )}
            onPress={() => navigation.push('Root')}
          >
            <Text style={tw('font-nunito-semibold text-base text-white')}>Login</Text>
          </TouchableOpacity>

          <View style={tw({ height: keyboardHeight })}></View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}
