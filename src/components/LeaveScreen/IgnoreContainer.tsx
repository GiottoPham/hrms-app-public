import type { LeaveParse } from '@/types/leave'

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { format } from 'date-fns'

import { tw } from '@/lib/tailwind'
export const IgnoreComponent = ({ leave }: { leave: LeaveParse }) => {
  const apply = format(new Date(leave.applicationDate), 'dd-MM-yyyy')
  const amount = leave.amount < 0 ? 1 : leave.amount == 0 ? 0.5 : leave.amount
  return (
    <TouchableOpacity
      style={tw(
        'mx-3 my-3 items-center px-3 h-30 w-98 relative flex flex-row items-start pt-2 bg-white rounded-lg'
      )}
    >
      {/* <Icon name="calendar" size={30} color="#FFBE55" /> */}

      <View style={tw('flex flex-col items-start w-55')}>
        <Text style={tw('font-nunito text-lg')}>{leave.leaveType}</Text>
        <Text style={tw('font-nunito mt-2')}> Số ngày: {amount}</Text>
        <Text style={tw('font-nunito mt-1')}>
          Thời gian: {leave.fromDate} - {leave.fromDate}
        </Text>
      </View>

      <View style={tw('flex flex-col w-35 items-end')}>
        <Text>{apply}</Text>
        <View style={tw('flex flex-row mt-12')}>
          <View style={tw('bg-red-500 w-1/2 p-2 h-10 flex justify-center items-center rounded-lg')}>
            <Text>Ignored</Text>
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
