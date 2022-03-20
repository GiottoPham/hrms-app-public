import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import IconZo from 'react-native-vector-icons/Zocial'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useState } from 'react'
import FieldSet from 'react-native-fieldset'
import IconEn from 'react-native-vector-icons/Entypo'
import IconMate from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAw from 'react-native-vector-icons/FontAwesome'

import { Tooltip } from 'react-native-elements'
import Popover from 'react-native-popover-view'

import { tw } from '@/lib/tailwind'
export const BasicInfo = () => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const onPress = () => {
    setVisible(!visible)
  }
  return (
    <View style={tw('px-5')}>
      <View style={tw('flex flex-row mb-2')}>
        <View>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Date of Birth</Text>
          <View style={tw('flex flex-row items-center ')}>
            <Icon name="birthday-cake" size={20} color="#ffbe55" style={tw('-mr-5')} />
            <TextInput
              style={tw('h-10 w-50 bg-transparent border-b border-yellow-600 text-white px-10')}
              value="28-11-1999"
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
        <View style={tw('ml-6')}>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Phone Number</Text>
          <View style={tw('flex flex-row items-center')}>
            <Icon name="phone" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
            <TextInput
              style={tw('h-10 w-40 bg-transparent border-b border-yellow-600 text-white px-10')}
              value="28-11-1999"
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
      </View>
      <Text style={tw('mt-1 font-nunito text-yellow-400 text-base')}>Email</Text>
      <View style={tw('flex flex-row items-center mb-2')}>
        <IconZo name="email" size={20} color="#ffbe55" style={tw('-mr-5')} />
        <TextInput
          style={tw('h-10 w-95 bg-transparent border-b border-yellow-600 text-white px-10')}
          value="giotto2015.py@gmail.com"
          underlineColorAndroid="transparent"
          editable={false}
          selectTextOnFocus={false}
        />
      </View>
      <View style={tw('mt-3 w-95 border-yellow-600 border h-45 rounded-xl')}>
        <View style={tw('h-5 w-35 -ml-2 items-center bg-black-900 top--3 ')}>
          <Text style={tw('text-yellow-400 text-base')}>Temporary Address</Text>
        </View>
        <View style={tw('flex flex-row mb-2 ml-3')}>
          <View>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Province/City</Text>
            <View style={tw('flex flex-row items-center ')}>
              <IconMate name="city-variant" size={20} color="#ffbe55" style={tw('-mr-5')} />
              <TextInput
                style={tw('h-10 w-48 bg-transparent border-b border-yellow-600 text-white px-10')}
                value="Ho Chi Minh City"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
          <View style={tw('ml-5')}>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>District</Text>
            <View style={tw('flex flex-row items-center')}>
              <IconMate name="city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
              <TextInput
                style={tw('h-10 w-38 bg-transparent border-b border-yellow-600 text-white px-10')}
                value="District 3"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
        </View>
        <View style={tw('flex flex-row mb-2 ml-3')}>
          <View>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Address</Text>

            <View style={tw('flex flex-row items-center ')}>
              <TouchableOpacity>
                <IconEn name="address" size={20} color="#ffbe55" style={tw('-mr-5')} />
              </TouchableOpacity>

              <Popover
                isVisible={visible}
                popoverStyle={tw('bg-yellow-400')}
                onRequestClose={() => setVisible(false)}
                from={
                  <TextInput
                    editable={false}
                    style={tw(
                      'h-10 w-48 bg-transparent border-b border-yellow-600 text-white px-10'
                    )}
                    value="219/89 Tran Van Dang"
                    onPressIn={() => setVisible(true)}
                    underlineColorAndroid="transparent"
                    selectTextOnFocus={false}
                  />
                }
              >
                <Text style={tw('text-base')}>219/89 Tran Van Dang</Text>
              </Popover>
            </View>
          </View>
          <View style={tw('ml-5')}>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Ward</Text>
            <View style={tw('flex flex-row items-center')}>
              <IconMate name="home-city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
              <TextInput
                onPressIn={() => {
                  console.log('hello')
                }}
                style={tw('h-10 w-38 bg-transparent border-b border-yellow-600 text-white px-10')}
                value="Ward 11"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={tw('mt-4 w-95 border-yellow-600 border h-45 rounded-xl')}>
        <View style={tw('h-5 w-35 -ml-2 items-center bg-black-900 top--3 ')}>
          <Text style={tw('text-yellow-400 text-base')}>Permanent Address</Text>
        </View>
        <View style={tw('flex flex-row mb-2 ml-3')}>
          <View>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Province/City</Text>
            <View style={tw('flex flex-row items-center ')}>
              <IconMate name="city-variant" size={20} color="#ffbe55" style={tw('-mr-5')} />
              <TextInput
                style={tw('h-10 w-48 bg-transparent border-b border-yellow-600 text-white px-10')}
                value="Phu Yen"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
          <View style={tw('ml-5')}>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>District</Text>
            <View style={tw('flex flex-row items-center')}>
              <IconMate name="city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
              <TextInput
                style={tw('h-10 w-38 bg-transparent border-b border-yellow-600 text-white px-10')}
                value="Tuy Hoa 3"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
        </View>
        <View style={tw('flex flex-row mb-2 ml-3')}>
          <View>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Address</Text>

            <View style={tw('flex flex-row items-center ')}>
              <TouchableOpacity>
                <IconEn name="address" size={20} color="#ffbe55" style={tw('-mr-5')} />
              </TouchableOpacity>

              <Popover
                isVisible={visible2}
                popoverStyle={tw('bg-yellow-400')}
                onRequestClose={() => setVisible2(false)}
                from={
                  <TextInput
                    editable={false}
                    style={tw(
                      'h-10 w-48 bg-transparent border-b border-yellow-600 text-white px-10'
                    )}
                    value="06/1 Tran Quy Cap"
                    onPressIn={() => setVisible2(true)}
                    underlineColorAndroid="transparent"
                    selectTextOnFocus={false}
                  />
                }
              >
                <Text style={tw('text-base')}>06/1 Tran Quy Cap</Text>
              </Popover>
            </View>
          </View>
          <View style={tw('ml-5')}>
            <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Ward</Text>
            <View style={tw('flex flex-row items-center')}>
              <IconMate name="home-city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
              <TextInput
                onPressIn={() => {
                  console.log('hello')
                }}
                style={tw('h-10 w-38 bg-transparent border-b border-yellow-600 text-white px-10')}
                value="Ward 3"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
