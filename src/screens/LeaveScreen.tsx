import { View, Text, RefreshControl, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { tw } from '@/lib/tailwind'
import { useLeaves } from '@/state/leave-queries'
import { useCurrentUser } from '@/state/auth-queries'
import { LeaveParse, LeaveType, LeaveTypeNum } from '@/types/leave'

import { LeaveAccept } from '../components/LeaveScreen/LeaveAgree'
import { LeaveIgnore } from '../components/LeaveScreen/LeaveIgnore'
import { LeavePending } from '../components/LeaveScreen/LeavePending'
import { AddButton } from '../components/LeaveScreen/AddButton'
import { useQueryClient } from 'react-query'
import { LEAVE } from '@/state/query-keys'
// import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createMaterialTopTabNavigator()
export const LeaveScreen = () => {
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const leaveTypeList: Record<LeaveTypeNum, LeaveType> = {
    0: LeaveType.Unpaid,
    1: LeaveType.Paid,
  }
  const { currentUser } = useCurrentUser()
  const { leaves } = useLeaves(currentUser?.id as number)
  const [listPending, setListPending] = useState<LeaveParse[]>([])
  const [listAgree, setListAgree] = useState<LeaveParse[]>([])
  const [listIgnore, setListIgnore] = useState<LeaveParse[]>([])

  const [add, setAdd] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [dateAvailable, setDateAvailable] = useState(new Date())
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    hideDatePicker()
    setDateAvailable(date)
  }

  useEffect(() => {
    console.log(currentUser)
    console.log(leaves)
    useCallback
    const listPendingEffect: LeaveParse[] = []
    const listAgreeEffect: LeaveParse[] = []
    const listIgnoreEffect: LeaveParse[] = []
    leaves?.forEach((item) => {
      const obj = {
        amount: item.amount,
        fromDate: format(new Date(item.fromDate), 'dd/MM/yyyy'),
        toDate: format(new Date(item.toDate), 'dd/MM/yyyy'),
        leaveType: leaveTypeList[0],
        reason: item.reason,
        applicationDate: item.applicationDate,
      }
      const applicationDate = new Date(obj.applicationDate)
      if (format(applicationDate, 'dd-MM-yyyy') === format(dateAvailable, 'dd-MM-yyyy')) {
        if (item.status == 0) listAgreeEffect.push(obj)
        else if (item.status == 1) listIgnoreEffect.push(obj)
        else listPendingEffect.push(obj)
      }
    })
    setListPending(listPendingEffect)
    setListIgnore(listIgnoreEffect)
    setListAgree(listAgreeEffect)
  }, [leaves, dateAvailable])
  return (
    // <ScrollView
    //     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <View style={tw('flex flex-1 bg-gray-200')}>
      {!add && (
        <View style={tw('flex flex-1 bg-gray-200')}>
          <View style={tw('h-20 flex items-center justify-center')}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={tw(
                'items-center bg-white px-3 h-13 w-45 relative flex flex-row justify-center rounded-lg'
              )}
            >
              <Icon name="calendar" size={30} color="#FFBE55" />
              <View style={tw('flex-grow flex items-center')}>
                <Text>{format(dateAvailable, 'dd-MM-yyyy')}</Text>
              </View>
              {/* <Icon reverse name="ios-american-football" type="ionicon" color="#517fa4" /> */}
            </TouchableOpacity>
            <AddButton changeAdd={() => setAdd(!add)} />
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            textColor="#FFBE55"
            date={dateAvailable}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Tab.Navigator
            initialRouteName="Pending"
            screenOptions={{
              tabBarActiveTintColor: '#ffbe55',
              tabBarLabelStyle: { fontSize: 14, fontFamily: 'nunito-bold' },
              tabBarStyle: { backgroundColor: '#000000' },
              tabBarPressColor: '#ffbe55',
              tabBarIndicatorStyle: {
                borderBottomColor: '#ffbe55',
                borderBottomWidth: 3,
              },
            }}
          >
            <Tab.Screen
              name="Pending"
              children={() => <LeavePending leaveList={listPending} />}
              options={{ tabBarLabel: 'Pending' }}
            />
            <Tab.Screen
              name="Accept"
              children={() => <LeaveAccept leaveList={listAgree} />}
              options={{ tabBarLabel: 'Accepted' }}
            />
            <Tab.Screen
              name="Ignore"
              children={() => <LeaveIgnore leaveList={listIgnore} />}
              options={{ tabBarLabel: 'Ignored' }}
            />
          </Tab.Navigator>
        </View>
      )}
      {add && (
        <View style={tw('flex flex-1 bg-gray-200')}>
          <AddButton changeAdd={() => setAdd(!add)} />
        </View>
      )}
    </View>
    // </ScrollView>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 20,
//   },
//   datePickerStyle: {
//     width: 200,
//     marginTop: 20,
//   },
// })
