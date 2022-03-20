import type { RootStackParamList } from '@/types/root'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { CheckinTabProps } from '@/types/check-in'
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'

import React, { useState, useEffect, useRef } from 'react'
import { BarCodeEvent, BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner'
import { Text, StyleSheet, Button, View, TouchableOpacity, Linking } from 'react-native'
import Camera, { RNCamera } from 'react-native-camera'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { da } from 'date-fns/locale'
import { useNavigation } from '@react-navigation/native'

import { tw } from '@/lib/tailwind'

export const CheckinQR = ({
  navigation,
}: MaterialTopTabScreenProps<CheckinTabProps, 'CheckinQR'>) => {
  const [hasPermission, setHasPermission] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [startScan, setStartScan] = useState(false)
  const [data, fetchData] = useState('')
  const startScanning = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status == 'granted')
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

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true)
    // Linking.openURL(data).catch((err) => console.error('An error occured', err))
    // console.log(response)
    fetchData(data)
    if (data == 'NBNHR-03/12') {
      alert('You successfully checked in')
      navigationBack.navigate('BottomTabs', {
        screen: 'CheckinBottom',
        params: { isChecking: true },
      })
    } else alert("Please scan company's QR")
  }

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>
  // }

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
      {scanned && startScan && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  )
}
