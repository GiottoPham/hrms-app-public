import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Platform } from 'react-native'
import { useEffect } from 'react'
import * as Calendar from 'expo-calendar'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

import { RootNavigator } from '@/navigation/RootNavigator'
import { useFonts } from '@/state/app-queries'

export const App = () => {
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyBzKK8bjf_6B1DJ7n9LZpH9YCsX7gt6xaU',
  //   authDomain: 'nbn-hr.firebaseapp.com',
  //   projectId: 'nbn-hr',
  //   storageBucket: 'nbn-hr.appspot.com',
  //   messagingSenderId: '1001017605502',
  //   appId: '1:1001017605502:web:0aacb3fe65304aa6d9c72f',
  //   measurementId: 'G-5E48XZ0PRS',
  // }
  const { isLoading } = useFonts()
  useEffect(() => {
    // initializeApp(firebaseConfig)
    // const db = getFirestore()
    // const docDB = collection(db, 'NBN')
    // const getData = async () => {
    //   const citySnapshot = await getDocs(docDB)
    //   const cityList = citySnapshot.docs.map((doc: { data: () => any }) => doc.data())
    //   console.log(cityList)
    // }
    // getData()

    // const db = getFirestore()
    // const docRef =
    // const output = {}

    // docRef
    //   .limit(50)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.docs.map(function (documentSnapshot) {
    //       return (output[documentSnapshot.id] = documentSnapshot.data())
    //     })
    //     this.setState({ dataSource: Object.entries(output) })
    //     console.log('datasource:', this.state.dataSource)
    //   })

    const _askForCalendarPermissions = async () => {
      await Calendar.requestCalendarPermissionsAsync()
    }

    const _askForReminderPermissions = async () => {
      if (Platform.OS === 'android') {
        return true
      }

      await Calendar.requestRemindersPermissionsAsync()
    }
    _askForCalendarPermissions()
    _askForReminderPermissions()
  }, [])
  if (isLoading) {
    return null
  }
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: DefaultTheme.colors.background,
    },
  }
  return (
    /**
     * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
     * https://reactnavigation.org/docs/getting-started
     */
    <NavigationContainer theme={MyTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
