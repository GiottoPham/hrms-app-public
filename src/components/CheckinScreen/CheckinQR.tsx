import type { RootStackParamList } from '@/types/root'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { CheckinTabProps } from '@/types/check-in'
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'

import * as Device from 'expo-device'
import React, { useState, useEffect, useRef } from 'react'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'
import { Text, StyleSheet, Button, View, TouchableOpacity, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import * as SecureStore from 'expo-secure-store'
import md5 from 'md5'

import { tw } from '@/lib/tailwind'
import { useCheckin_inRequest, useCheckin_outRequest } from '@/state/checkin-mutation'
import { useCurrentUser } from '@/state/auth-queries'
import { useHaveCheckedin } from '@/state/checkin-queries'
export const CheckinQR = ({
  navigation,
}: {
  navigation: MaterialTopTabScreenProps<CheckinTabProps, 'CheckinQR'>
}) => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>()

  const { currentUser } = useCurrentUser()
  const { checkedin } = useHaveCheckedin(currentUser?.id as number)
  const { sendCheckin_outRequest } = useCheckin_outRequest()
  const [hasPermission, setHasPermission] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [startScan, setStartScan] = useState(false)
  const [data, fetchData] = useState('')
  const startScanning = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status == 'granted')
    const needCheck = await SecureStore.getItemAsync('dateCheckedin')
    const dateNow = new Date().getDate()
    if (needCheck == null || needCheck != (dateNow + 1).toString()) {
      await SecureStore.setItemAsync('dateCheckedin', dateNow.toString())
    } else {
      alert('Only checkin one time one device each day')
      navigate.navigate('BottomTabs', {
        screen: 'CheckinBottom',
        params: { isChecking: false },
      })
    }
    setStartScan(true)
  }
  useEffect(() => {
    setStartScan(false)
    navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      setStartScan(false)
      // Do something manually
      // ...
    })
  }, [navigation])

  const navigationBack = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { sendCheckin_inRequest } = useCheckin_inRequest()
  console.log(new Date().getDate() + 1)
  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true)
    // Linking.openURL(data).catch((err) => console.error('An error occured', err))
    // console.log(response)
    const date = new Date()
    const code =
      'NBNHR' +
      ' ' +
      date.getDate().toString() +
      ' ' +
      date.getMonth().toString() +
      ' ' +
      date.getFullYear().toString() +
      ' ' +
      currentUser?.eid
    fetchData(data)
    console.log(code)
    console.log(md5(code))
    if (data == md5(code)) {
      if (checkedin?.timeIn == null) {
        alert('You successfully checked in')
        sendCheckin_inRequest({
          userId: currentUser?.id as number,
          deviceId: Device.deviceName as string,
          date: new Date().toISOString(),
          timeIn: new Date().toISOString(),
        })
        navigationBack.navigate('BottomTabs', {
          screen: 'CheckinBottom',
          params: { isChecking: true },
        })
      } else {
        alert('You successfully checked out')
        sendCheckin_outRequest({
          userId: currentUser?.id as number,
          deviceId: Device.deviceName as string,
          date: new Date().toISOString(),
          timeOut: new Date().toISOString(),
        })
        navigationBack.navigate('BottomTabs', {
          screen: 'CheckinBottom',
          params: { isChecking: false },
        })
      }
    } else alert("Please scan company's QR")
    setStartScan(false)
  }

  return (
    <View style={tw('flex-1')}>
      {!startScan && (
        <TouchableOpacity
          style={tw(
            'mt-50 ml-37 bg-yellow-400 h-13 w-30 shadow-md rounded-full items-center justify-center'
          )}
          onPress={startScanning}
        >
          <Text style={tw('font-nunito-bold text-base text-white')}> START TO SCAN </Text>
        </TouchableOpacity>
      )}
      {startScan && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && startScan && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  )
}
