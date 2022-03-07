import type { NavigatorScreenParams } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Login: undefined
  BottomTabs: NavigatorScreenParams<RootTabParamList> | undefined
  Checkin: undefined
  Leave: undefined
  Salary: undefined
  Information: undefined
  Notification: undefined
  LeavePending: undefined
  CreateLeave: undefined
}
export type DrawerParamList = {
  
}

export type RootTabParamList = {
  CheckinBottom: undefined
  LeaveBottom: undefined
  Salary: undefined
  Information: undefined
  Notification: undefined
  CreateLeave: undefined
}
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  Screen
>
