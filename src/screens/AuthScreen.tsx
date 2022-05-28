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
  Alert,
  Modal,
  Button,
} from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import * as Application from 'expo-application'
import { Rating } from 'react-native-elements'

import { tw } from '@/lib/tailwind'
import { LogoIcon } from '@/assets/icons/LogoIcon'
import { useLogin } from '@/state/auth-mutation'
import { useCurrentUser } from '@/state/auth-queries'
import { RatingModal } from '@/components/AuthScreen/RatingModal'

export const AuthScreen = () => {
  const { login } = useLogin()
  const { currentUser, isLoadingUser } = useCurrentUser()
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
  const handleLogin = () => {
    login({ username: username, password: password })
      .then(() => navigation.replace('BottomTabs'))
      .catch(() =>
        Alert.alert('Authenticated failed', 'Please input your username and password again!')
      )
  }
  const getInstallTime = async () => {
    const install = await Application.getInstallationTimeAsync()
    console.log(install)
  }
  useEffect(() => {
    getInstallTime()

    const showSubscriptieon = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
    return () => {
      showSubscriptieon.remove()
      hideSubscription.remove()
    }
  }, [])
  useEffect(() => {
    if (!isLoadingUser && currentUser) navigation.replace('BottomTabs')
  }, [isLoadingUser, navigation, currentUser])

  // useEffect(() => {
  //   getInstallTime()
  // }, [])
  const [isModalVisible, setModalVisible] = useState(true)
  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating)
  }

  return (
    <Fragment>
      {/* <RatingModal {...{ setModalVisible, isModalVisible }}>
        <Rating showRating onFinishRating={ratingCompleted} style={{ paddingVertical: 10 }} />
        <Button title="Ask me later" onPress={() => setModalVisible(false)} />
      </RatingModal> */}
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
              onPress={handleLogin}
            >
              <Text style={tw('font-nunito-semibold text-base text-white')}>Login</Text>
            </TouchableOpacity>

            <View style={tw({ height: keyboardHeight })}></View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  )
}
