import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import IconZo from 'react-native-vector-icons/Zocial'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useState } from 'react'
import FieldSet from 'react-native-fieldset'
import IconEn from 'react-native-vector-icons/Entypo'
import IconMate from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAw from 'react-native-vector-icons/FontAwesome5'
import IconMa from 'react-native-vector-icons/MaterialIcons'

import { Tooltip } from 'react-native-elements'
import Popover from 'react-native-popover-view'

import { tw } from '@/lib/tailwind'
export const JobSalary = () => {
  const [visible, setVisible] = useState(false)

  return (
    <View style={tw('px-5')}>
      <View style={tw('flex flex-row mb-2')}>
        <View style={tw('mt-4 w-95 border-yellow-600 border-t h-80 ')}>
          <View style={tw('h-5 w-35 -ml-4 items-center bg-black-900 top--3 ')}>
            <Text style={tw('text-yellow-400 text-base')}>Job Information</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Join Date</Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconAw name="calendar-alt" size={20} color="#ffbe55" style={tw('-mr-5 ')} />

                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="03/03/2022"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
            <View style={tw('ml-5')}>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Job Title</Text>
              <View style={tw('flex flex-row items-center')}>
                <IconMa name="work" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
                <Popover
                  isVisible={visible}
                  popoverStyle={tw('bg-yellow-400')}
                  onRequestClose={() => setVisible(false)}
                  from={
                    <TextInput
                      style={tw(
                        'h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10'
                      )}
                      value="Junior Frontend Developer"
                      underlineColorAndroid="transparent"
                      editable={false}
                      onPressIn={() => setVisible(true)}
                      selectTextOnFocus={false}
                    />
                  }
                >
                  <Text style={tw('text-base')}>Junior Frontend Developer</Text>
                </Popover>
              </View>
            </View>
          </View>
          <View style={tw('flex flex-row mb-2 ml-1')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Unit</Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconMate name="network" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="CEO"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
            <View style={tw('ml-5')}>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>PIT Code</Text>
              <View style={tw('flex flex-row items-center')}>
                <IconAw name="calendar-alt" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value="99999999"
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
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>
                Primary healthcare service establishment
              </Text>
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
