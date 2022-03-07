import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { tw } from '@/lib/tailwind'
export const IgnoreComponent = () => {
  return (
    <TouchableOpacity
      style={tw(
        'mx-3 my-3 items-center px-3 h-30 w-98 relative flex flex-row items-start pt-2 bg-white rounded-lg'
      )}
    >
      {/* <Icon name="calendar" size={30} color="#FFBE55" /> */}

      <View style={tw('flex flex-col items-start w-1/2')}>
        <Text style={tw('font-nunito text-lg')}>Nghỉ không lương</Text>
        <Text style={tw('font-nunito mt-2')}>Số ngày: 1/2</Text>
        <Text style={tw('font-nunito mt-1')}>Thời gian: 28/2/2022</Text>
      </View>

      <View style={tw('flex flex-col w-1/2 items-end')}>
        <Text>Yesterday: 3: 42 CH</Text>
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
