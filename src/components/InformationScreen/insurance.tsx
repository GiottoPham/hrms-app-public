import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import IconZo from 'react-native-vector-icons/Zocial'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useState } from 'react'
import FieldSet from 'react-native-fieldset'
import IconEn from 'react-native-vector-icons/Entypo'
import IconMate from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAw from 'react-native-vector-icons/FontAwesome5'

import { Tooltip } from 'react-native-elements'
import Popover from 'react-native-popover-view'

import { tw } from '@/lib/tailwind'
export const Insurance = () => {
  return (
    <View style={tw('px-5')}>
      <View style={tw('flex flex-row mb-2')}>
        <View style={tw('mt-4 w-95 border-yellow-600 border-t h-80 ')}>
          <View style={tw('h-5 w-35 -ml-4 items-center bg-black-900 top--3 ')}>
            <Text style={tw('text-yellow-400 text-base')}>Health Insurance</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Number</Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconAw name="id-card" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="EY3000239192"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
            <View style={tw('ml-5')}>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Issue Date</Text>
              <View style={tw('flex flex-row items-center')}>
                <IconAw name="calendar-alt" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="09/03/2015"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </View>
          <View style={tw('flex flex-row mb-2 ml-1')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>From Date</Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconAw name="calendar-alt" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="01/01/2021"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
            <View style={tw('ml-5')}>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>To Date</Text>
              <View style={tw('flex flex-row items-center')}>
              <IconAw name="calendar-alt" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="31/12/2021"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Province</Text>
              <View style={tw('flex flex-row items-center ')}>
              <IconMate name="city-variant" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-95 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="Ho Chi Minh City"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Primary healthcare service establishment</Text>
              <View style={tw('flex flex-row items-center ')}>
              <IconAw name="hospital" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-95 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="Benh vien Quan 3"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
