import type { NavigatorScreenParams } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Login: undefined
  Root: NavigatorScreenParams<DrawerParamList> | undefined
  Checkin: undefined
  Leave: undefined
  Salary: undefined
  Information: undefined
  Notification: undefined
}
export type DrawerParamList = {
  BottomTabs: NavigatorScreenParams<RootTabParamList> | undefined
}

export type RootTabParamList = {
  Checkin: undefined
  Leave: undefined
  Salary: undefined
  Information: undefined
  Notification: undefined
}
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  Screen
>
