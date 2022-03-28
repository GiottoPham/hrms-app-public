import type { LeaveParse } from '@/types/leave'

import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { tw } from '@/lib/tailwind'
import { format } from 'date-fns'
export const AgreeComponent = ({ leave }: { leave: LeaveParse }) => {
  const applyDate = format(new Date(leave.applicationDate), 'dd-MM-yyyy')
  const applyMonth = format(new Date(leave.applicationDate), 'h:mm a')
  const apply =  format(new Date(leave.applicationDate), 'dd-MM-yyyy h:mm a')
  return (
    <TouchableOpacity
      style={tw(
        'mx-3 my-3 items-center px-3 h-30 w-98 relative flex flex-row items-start pt-2 bg-white rounded-lg'
      )}
    >
      {/* <Icon name="calendar" size={30} color="#FFBE55" /> */}

      <View style={tw('flex flex-col items-start w-55')}>
        <Text style={tw('font-nunito text-lg')}>{leave.leaveType}</Text>
        <Text style={tw('font-nunito mt-2')}>Số ngày: {leave.amount}</Text>
        <Text style={tw('font-nunito mt-1')}>
          Thời gian: {leave.fromDate} - {leave.toDate}
        </Text>
      </View>

      <View style={tw('flex flex-col w-35 items-end')}>
        <Text>{apply}</Text>
        <View style={tw('flex flex-row mt-12')}>
          <View
            style={tw('bg-green-400 w-1/2 p-2 h-10 flex justify-center items-center rounded-lg')}
          >
            <Text>Accepted</Text>
          </View>
        </View>
      </View>

      {/* <View style={tw('flex-grow flex items-center col-span-2')}>
        <Text>Đăng kí nghỉ</Text>
      </View> */}
      {/* <Icon reverse name="ios-american-football" type="ionicon" color="#517fa4" /> */}
    </TouchableOpacity>
  )
}
