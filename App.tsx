import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Platform } from 'react-native'
import { useEffect } from 'react'
import * as Calendar from 'expo-calendar'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

import { RootNavigator } from '@/navigation/RootNavigator'
import { useFonts } from '@/state/app-queries'

export const App = () => {
  const { isLoading } = useFonts()
  useEffect(() => {
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
