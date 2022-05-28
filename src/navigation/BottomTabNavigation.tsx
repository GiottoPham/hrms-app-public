import type { RootTabParamList } from '@/types/root'
import type { BottomTabNavigationOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  Text,
  SafeAreaView as SafeAreaViewIOS,
  StatusBar,
  Platform,
  View,
  Pressable,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context'

import { tw } from '@/lib/tailwind'
import { CheckinScreen } from '@/screens/CheckinScreen'
import { CheckinIcon } from '@/assets/icons/CheckinIcon'
import { LeaveScreen } from '@/screens/LeaveScreen'
import { SalaryScreen } from '@/screens/SalaryScreen'
import { InformationScreen } from '@/screens/InformationScreen'
import { NotiScreen } from '@/screens/NotiScreen'
import { LeaveIcon } from '@/assets/icons/LeaveIcon'
import { CalendarIcon } from '@/assets/icons/CalendarIcon'
import { InformationIcon } from '@/assets/icons/InformationIcon'
import { SalaryIcon } from '@/assets/icons/SalaryIcon'
import { CreateFormLeave } from '@/screens/CreateFormLeave'
import { CheckinMethod } from '@/components/CheckinScreen/CheckinMethod'
import { useCurrentUser } from '@/state/auth-queries'
import { CreateTask } from '@/screens/CreateTask'
import { useEmployee } from '@/state/employee-queries'
const BottomTab = createBottomTabNavigator<RootTabParamList>()

export const BottomTabNavigator = () => {
  const { currentUser } = useCurrentUser()
  const { employee } = useEmployee(currentUser?.eid as number)
  return (
    <BottomTab.Navigator
      initialRouteName="CheckinBottom"
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      tabBar={TabBar}
    >
      {[
        {
          name: 'LeaveBottom' as const,
          label: 'Leave',
          Component: LeaveScreen,
          Icon: LeaveIcon,
        },
        {
          name: 'Salary' as const,
          label: 'Salary',
          Component: SalaryScreen,
          Icon: SalaryIcon,
        },
        {
          name: 'CheckinBottom' as const,
          label: 'Check in',
          Component: CheckinScreen,
          Icon: CheckinIcon,
        },
        {
          name: 'Notification' as const,
          label: 'Notification',
          Component: NotiScreen,
          Icon: CalendarIcon,
        },
        {
          name: 'Information' as const,
          label: 'Information',
          Component: InformationScreen,
          Icon: InformationIcon,
        },
        {
          name: 'CreateLeave' as const,
          label: 'Create Form Leave',
          Component: CreateFormLeave,
          Icon: InformationIcon,
        },
        {
          name: 'CreateTask' as const,
          label: 'Create Event',
          Component: CreateTask,
          Icon: CalendarIcon,
        },
        {
          name: 'CheckinMethod' as const,
          label: 'Select Checkin Method',
          Component: CheckinMethod,
          Icon: InformationIcon,
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
                  style={tw('flex items-center justify-center', {
                    'bg-primary mb-13 rounded-full w-16 h-16 shadow-lg': name === 'CheckinBottom',
                  })}
                >
                  <Icon
                    style={tw('self-center w-8 h-8', {
                      'text-primary': focused && name !== 'CheckinBottom',
                      'text-black': !focused,
                      'text-white': focused && name === 'CheckinBottom',
                    })}
                  />
                </View>
              ),
              headerShown: true,
              header: () => {
                const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewAndroid
                return (
                  <SafeAreaView style={tw('bg-white h-20 shadow-lg flex flex-col items-center')}>
                    <StatusBar barStyle="dark-content" />
                    <View style={tw('flex-grow flex flex-row items-center w-full justify-between')}>
                      <View style={tw('flex flex-row items-center pl-2')}>
                        <Avatar
                          size={32}
                          rounded
                          source={{
                            uri: !employee
                              ? 'https://png2.cleanpng.com/sh/c19eebe8d9f5306b216767f15eff595b/L0KzQYm3VsI0N6t1hJH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TfF3aaVmip98b3Pscb20jfVlcZIyet54Zz3pf7B7TfF4baR0RdNBYYTkgn7wgB9vNWZnStcEOXO3RIGCVsI0NmU7TKUEMUi0QYa5Wcc5OGc8TqQBNEaxgLBu/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c4409623.4643918115297806762646.png'
                              : employee.personalDetail.avatar,
                          }}
                          title={'N'}
                        />
                        <Text style={tw('font-nunito-semibold text-lg pl-2')}>
                          Hello, {currentUser?.username}
                        </Text>
                      </View>
                      <Text style={tw('font-nunito-semibold text-lg text-primary pr-2')}>
                        {label.toUpperCase()}
                      </Text>
                    </View>
                  </SafeAreaView>
                )
              },
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
      style={tw('flex flex-row shadow-lg bg-white', {
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
      style={tw('w-1/5 flex justify-center items-center', {
        '-mt-12': route.name === 'Checkin',
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
