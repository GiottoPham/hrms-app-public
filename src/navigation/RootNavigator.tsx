import type { RootStackParamList } from '@/types/root'

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'

import { AuthScreen } from '@/screens/AuthScreen'
import { CheckinScreen } from '@/screens/CheckinScreen'
import { LeaveScreen } from '@/screens/LeaveScreen'
import { InformationScreen } from '@/screens/InformationScreen'
import { NotiScreen } from '@/screens/NotiScreen'
import { CreateFormLeave } from '@/screens/CreateFormLeave'
import { CheckinMethod } from '@/components/CheckinScreen/CheckinMethod'
import { CreateTask } from '@/screens/CreateTask'

import { BottomTabNavigator } from './BottomTabNavigation'

const Stack = createStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="Checkin"
        component={CheckinScreen}
        options={{
          presentation: 'card',
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="Leave"
        component={LeaveScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="Salary"
        component={CheckinScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="Information"
        component={InformationScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotiScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="CreateLeave"
        component={CreateFormLeave}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="CheckinMethod"
        component={CheckinMethod}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
    </Stack.Navigator>
  )
}
