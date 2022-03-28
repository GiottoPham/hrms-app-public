import type { styles } from 'react-native-circular-progress-indicator/src/circularProgressWithChild/types'
import type { RootStackParamList } from '@/types/root'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import type { CheckinTabProps } from '@/types/check-in'

import { getDistance } from 'geolib'
import { View, Text, Dimensions, Image, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFoundation from 'react-native-vector-icons/Foundation'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import DeviceInfo from 'react-native-device-info'

import { tw } from '@/lib/tailwind'
import CompanyIcon from '@/assets/images/company_pin.png'
import { useCheckin_inRequest } from '@/state/checkin-mutation'
import { useCurrentUser } from '@/state/auth-queries'

export const CheckinGPS = () => {
  // const geolocation = new Geolocation()
  const { currentUser } = useCurrentUser()
  const check_inInput = {
    userId: currentUser?.id,
    deviceId: DeviceInfo.getDeviceId(),
    date: new Date().toISOString(),
    timeIn: format(new Date(), 'HH:mm:ss'),
  }
  const [refresh, setRefresh] = useState(false)
  const onPress = () => setRefresh(!refresh)
  const company_latitude = 10.78697
  const company_longtitude = 106.67218

  const { width, height } = Dimensions.get('window')
  const ASPECT_RATIO = width / height
  const LATITUDE_DELTA = 0.0922
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  // const [initialPositon, setInitialPosition] = useState({
  //   latitude: 10.78697,
  //   longitude: 106.67218,
  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // })
  const [location1, setLocation1] = useState({
    location: { latitude: 0, longitude: 0 },
    geocode: null,
    errorMessage: '',
  })
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      })
      const { latitude, longitude } = location.coords
      setLocation1({ ...location1, location: { latitude, longitude } })
      setRegion({ ...region, latitude: latitude, longitude: longitude })
      setIsLoading(false)
      setDistance(
        getDistance(
          { latitude: latitude, longitude: longitude },
          { latitude: company_latitude, longitude: company_longtitude }
        )
      )
    }

    // getGeocodeAsync({ latitude, longitude })
    // this.setState({ location: { latitude, longitude } })
  }
  const [distance, setDistance] = useState(0)
  useEffect(() => {
    getLocationAsync()
  }, [])
  useEffect(() => {
    getLocationAsync()
  }, [refresh])
  getDistance(
    { latitude: 20.0504188, longitude: 64.4139099 },
    { latitude: 51.528308, longitude: -0.3817765 }
  )
  const { sendCheckin_inRequest } = useCheckin_inRequest()
  const handleOnConfirm = () => {
    sendCheckin_inRequest(check_inInput)
    navigation.navigate('BottomTabs', {
      screen: 'CheckinBottom',
      params: { isChecking: true },
    })
  }
  // getGeocodeAsync = async (location) => {
  //   const geocode = await Location.reverseGeocodeAsync(location)
  //   this.setState({ geocode })
  // }

  // const getLocation = () =>
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const coords = position.coords
  //       setInitialPosition({
  //         latitude: coords.latitude,
  //         longitude: coords.longitude,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       })
  //     },
  //     (error) => alert(JSON.stringify(error)),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   )

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const coords = position.coords
  //       setInitialPosition({
  //         latitude: coords.latitude,
  //         longitude: coords.longitude,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       })
  //     },
  //     (error) => alert(JSON.stringify(error)),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   )
  // }, [])
  if (isLoading)
    return (
      <View style={tw('h-full w-full bg-gray-200')}>
        <Text style={tw('px-2 py-1 font-nunito-bold text-lg')}>Your Location</Text>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    )
  return (
    <View style={tw('h-full w-full bg-gray-200')}>
      <Text style={tw('px-2 py-1 font-nunito-bold text-lg')}>Your Location</Text>
      <View
        style={tw(
          'h-75 w-100 items-center justify-center bg-white ml-1 py-1 border-2 border-gray-300'
        )}
      >
        <MapView style={tw('h-70 w-95')} initialRegion={region}>
          <Marker
            coordinate={{ latitude: company_latitude, longitude: company_longtitude }}
            title="This is your company location"
          >
            <Image source={CompanyIcon} style={{ height: 30, width: 30 }} />
          </Marker>
          <Marker coordinate={location1.location} title="This is your location"></Marker>
        </MapView>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={tw(
          'mt-1 h-7 w-38 bg-green-200 ml-63 flex-row items-center justify-center rounded-lg'
        )}
      >
        <Icon name="refresh" color={'#4bcf0e'} size={18} />

        <Text style={tw('font-nunito')}>Refresh Your Location</Text>
      </TouchableOpacity>
      {distance < 200 ? (
        <TouchableOpacity
          style={tw(
            'h-10 w-30 ml-37 mt-5 bg-blue-700 flex-row items-center justify-center rounded-lg'
          )}
          onPress={handleOnConfirm}
        >
          <Text style={tw('text-white text-lg font-nunito-bold')}>CONFIRM</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View
            style={tw('flex items-center justify-center mt-5 bg-white w-90 h-15 ml-6 rounded-2xl')}
          >
            <IconFoundation name="alert" color={'#ff0000'} size={40} style={tw('-mt-10')} />
            <Text style={tw('font-nunito-bold text-base text-red-500')}>
              Your location is too far from the checkin location !
            </Text>
          </View>
          {/* <View>
            <Text style={tw('ml-13 mt-2 font-nunito-bold text-base text-red-400')}>
              Please come to your company's location !{' '}
            </Text>
          </View> */}
        </>
      )}
    </View>
  )
}
