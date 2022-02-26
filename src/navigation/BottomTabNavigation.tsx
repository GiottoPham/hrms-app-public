import type { RootTabParamList } from '@/types/root'
import type { BottomTabNavigationOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { Pressable, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { tw } from '@/lib/tailwind'
import { CheckinScreen } from '@/screens/CheckinScreen'
import { CheckinIcon } from '@/assets/icons/CheckinIcon'
import { LeaveScreen } from '@/screens/LeaveScreen'
import { SalaryScreen } from '@/screens/SalaryScreen'
import { InformationScreen } from '@/screens/InformationScreen'
import { NotiScreen } from '@/screens/NotiScreen'
const BottomTab = createBottomTabNavigator<RootTabParamList>()

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Checkin"
      screenOptions={{
        headerShown: true,
        lazy: true,
      }}
      tabBar={TabBar}
    >
      {[
        {
          name: 'Leave' as const,
          label: 'LeaveTab',
          Component: LeaveScreen,
          Icon: CheckinIcon,
        },
        {
          name: 'Salary' as const,
          label: 'SalaryTab',
          Component: SalaryScreen,
          Icon: CheckinIcon,
        },
        {
          name: 'Checkin' as const,
          label: 'Checkin',
          Component: CheckinScreen,
          Icon: CheckinIcon,
        },
        {
          name: 'Information' as const,
          label: 'InformationTab',
          Component: InformationScreen,
          Icon: CheckinIcon,
        },
        {
          name: 'Notification' as const,
          label: 'NotificationTab',
          Component: NotiScreen,
          Icon: CheckinIcon,
        },
      ].map(({ label, name, Component, Icon }) => {
        return (
          <BottomTab.Screen
            key={name}
            name={name}
            component={Component}
            options={{
              tabBarLabel: label,
              tabBarIcon: ({ focused }) => (
                <View
                  style={tw(' flex items-center justify-center', {
                    'bg-primary rounded-full w-18 h-18': name === 'Checkin',
                  })}
                >
                  <Icon
                    style={tw('h-8 w-8 self-center -mt-1', {
                      'text-primary': focused && name !== 'Checkin',
                      'text-black': !focused,
                      'text-white': focused && name === 'Checkin',
                    })}
                  />
                </View>
              ),
            }}
          />
        )
      })}
    </BottomTab.Navigator>
  )
}

const TabBar = ({ state, descriptors, navigation, insets }: BottomTabBarProps) => {
  return (
    <View
      style={tw('flex flex-row rounded-xl bg-white shadow-md', {
        height: 60 + insets.bottom,
      })}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const { options } = descriptors[route.key]

        return (
          <Tab
            key={route.key}
            options={options}
            isFocused={isFocused}
            navigation={navigation}
            route={route}
          />
        )
      })}
    </View>
  )
}

type TabProps = {
  route: BottomTabBarProps['state']['routes'][0]
  navigation: BottomTabBarProps['navigation']
  options: BottomTabNavigationOptions
  isFocused: boolean
}

const Tab = ({ route, options, navigation, isFocused }: TabProps) => {
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({
        name: route.name,
        params: undefined,
        merge: true,
      })
    }
  }

  return (
    <Pressable
      key={route.key}
      accessibilityRole="button"
      onPress={onPress}
      style={tw('w-1/5 flex justify-center', {
        '-mt-10': route.name === 'Checkin',
      })}
    >
      {options.tabBarIcon &&
        options.tabBarIcon({
          focused: isFocused,
          color: '#FFAC2F',
          size: 24,
        })}
    </Pressable>
  )
}
