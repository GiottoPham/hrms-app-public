import type { CheckinTabProps } from '@/types/check-in'

import { ScrollView, View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { tw } from '@/lib/tailwind'

import { CheckinGPS } from './CheckinGPS'
import { CheckinQR } from './CheckinQR'
export const CheckinMethod = () => {
  const Tab = createMaterialTopTabNavigator<CheckinTabProps>()

  return (
    <View style={tw('flex flex-1 bg-white')}>
      <Tab.Navigator
        initialRouteName="CheckinGPS"
        screenOptions={{
          tabBarInactiveTintColor: '#444444',
          tabBarActiveTintColor: '#ffbe00',
          tabBarLabelStyle: { fontSize: 16, fontFamily: 'nunito-bold' },
          tabBarStyle: { backgroundColor: '#fff8cc' },
          tabBarPressColor: '#ffbe55',
          tabBarIndicatorStyle: {
            borderBottomColor: '#ffbe55',
            borderBottomWidth: 3,
          },
        }}
      >
        <Tab.Screen
          name="CheckinGPS"
          component={CheckinGPS}
          options={{
            tabBarLabel: 'By GPS',
            tabBarIcon: ({ focused }) => (
              <Icon
                size={25}
                name={'location-on'}
                color={focused == true ? '#ffbe55' : '#444444'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CheckinQR"
          component={CheckinQR}
          options={{
            tabBarLabel: 'By QR',
            tabBarIcon: ({ focused }) => (
              <Icon
                size={25}
                name={'qr-code-scanner'}
                color={focused == true ? '#ffbe55' : '#444444'}
              />
            ),
            lazy: true,
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
