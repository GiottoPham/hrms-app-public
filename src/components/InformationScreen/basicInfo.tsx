import type { PersonalDetailInputParams } from '@/types/employee'
import type { District, Ward } from '@/types/coutries'

import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import IconZo from 'react-native-vector-icons/Zocial'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useState } from 'react'
import IconEn from 'react-native-vector-icons/Entypo'
import IconMate from 'react-native-vector-icons/MaterialCommunityIcons'
import Popover from 'react-native-popover-view'
import { format } from 'date-fns'

import { tw } from '@/lib/tailwind'
import { useCities, useDistricts, useWards } from '@/state/countries-queries'
export const BasicInfo = ({
  info,
}: {
  info?: Omit<PersonalDetailInputParams, 'avatar'> & {
    avatar: string
  }
}) => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const { cities } = useCities()
  const { districts: districtsPer } = useDistricts(info?.permanentAddress.cityId as number)
  const { districts: districtsTemp } = useDistricts(info?.temporaryAddress.cityId as number)
  const { wards: wardsPer } = useWards(info?.permanentAddress.districtId as number)
  const { wards: wardsTemp } = useWards(info?.temporaryAddress.districtId as number)
  if (!info || !cities || !districtsPer || !districtsTemp || !wardsPer || !wardsTemp)
    return <ActivityIndicator size="small" color="#0000ff" />
  const findWard = (wards: Ward[], wardId: number) =>
    wards.find((ward) => ward.ward_id === wardId)?.ward_name
  const findDistrict = (districts: District[], districtId: number) =>
    districts.find((district) => district.district_id === districtId)?.district_name
  return (
    <View style={tw('px-5 pb-10')}>
      <View style={tw('flex flex-row mb-2')}>
        <View>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Date of Birth</Text>
          <View style={tw('flex flex-row items-center ')}>
            <Icon name="birthday-cake" size={20} color="#ffbe55" style={tw('-mr-5')} />
            <TextInput
              style={tw('h-10 w-50 bg-transparent border-b border-yellow-600 text-white px-10')}
              value={format(new Date(info.dateOfBirth), 'dd-MM-yyyy')}
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
              value={info.phone}
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
          value={info.email}
          underlineColorAndroid="transparent"
          editable={false}
          selectTextOnFocus={false}
        />
      </View>
      <View style={tw('mt-3 w-95 border-yellow-600 border h-75 rounded-xl')}>
        <View style={tw('h-5 w-35 -ml-2 items-center bg-black-900 top--3 ')}>
          <Text style={tw('text-yellow-400 text-base')}>Temporary Address</Text>
        </View>
        {/* <View style={tw('flex flex-row mb-2 ml-3')}> */}
        <View>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1 ml-5')}>Province/City</Text>
          <View style={tw('flex flex-row items-center ml-5 ')}>
            <IconMate name="city-variant" size={20} color="#ffbe55" style={tw('-mr-5')} />
            <TextInput
              style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
              value={
                cities?.find((city) => city.province_id == info.temporaryAddress.cityId)
                  ?.province_name
              }
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
        <Text style={tw('font-nunito text-yellow-400 text-base mt-1 ml-5')}>District</Text>
        <View style={tw('flex flex-row items-center ml-5')}>
          <IconMate name="city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
          <TextInput
            style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
            value={findDistrict(districtsTemp, info.temporaryAddress.districtId)}
            underlineColorAndroid="transparent"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        {/* </View> */}
        <View style={tw('ml-5')}>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Ward</Text>
          <View style={tw('flex flex-row items-center')}>
            <IconMate name="home-city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
            <TextInput
              style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
              value={findWard(wardsTemp, info.temporaryAddress.wardId)}
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
        <View>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1 ml-5')}>Address</Text>

          <View style={tw('flex flex-row items-center ml-5')}>
            <TouchableOpacity>
              <IconEn name="address" size={20} color="#ffbe55" style={tw('-mr-5')} />
            </TouchableOpacity>

            {/* <Popover
              isVisible={visible}
              popoverStyle={tw('bg-yellow-400')}
              onRequestClose={() => setVisible(false)}
              from={ */}
            <TextInput
              editable={false}
              style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
              value={info.temporaryAddress.address}
              onPressIn={() => setVisible(true)}
              underlineColorAndroid="transparent"
              selectTextOnFocus={false}
            />
            {/* //   } */}
            {/* // > */}
            <Text style={tw('text-base')}>{info.temporaryAddress.address}</Text>
            {/* </Popover> */}
          </View>
        </View>
      </View>
      <View style={tw('mt-4 w-95 border-yellow-600 border h-75 rounded-xl')}>
        <View style={tw('h-5 w-35 -ml-2 items-center bg-black-900 top--3 ')}>
          <Text style={tw('text-yellow-400 text-base')}>Permanent Address</Text>
        </View>
        <View>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1 ml-5')}>Province/City</Text>
          <View style={tw('flex flex-row items-center ml-5 ')}>
            <IconMate name="city-variant" size={20} color="#ffbe55" style={tw('-mr-5')} />
            <TextInput
              style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
              value={
                cities?.find((city) => city.province_id == info.permanentAddress.cityId)
                  ?.province_name
              }
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
        <Text style={tw('font-nunito text-yellow-400 text-base mt-1 ml-5')}>District</Text>
        <View style={tw('flex flex-row items-center ml-5')}>
          <IconMate name="city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
          <TextInput
            style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
            value={findDistrict(districtsPer, info.permanentAddress.districtId)}
            underlineColorAndroid="transparent"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        {/* </View> */}
        <View style={tw('ml-5')}>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Ward</Text>
          <View style={tw('flex flex-row items-center')}>
            <IconMate name="home-city" size={20} color="#ffbe55" style={tw('-mr-5 ')} />
            <TextInput
              style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
              value={findWard(wardsPer, info.permanentAddress.wardId)}
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
        <View>
          <Text style={tw('font-nunito text-yellow-400 text-base mt-1 ml-5')}>Address</Text>

          <View style={tw('flex flex-row items-center ml-5')}>
            <TouchableOpacity>
              <IconEn name="address" size={20} color="#ffbe55" style={tw('-mr-5')} />
            </TouchableOpacity>

            {/* <Popover
              isVisible={visible}
              popoverStyle={tw('bg-yellow-400')}
              onRequestClose={() => setVisible(false)}
              from={ */}
            <TextInput
              editable={false}
              style={tw('h-10 w-85 bg-transparent border-b border-yellow-600 text-white px-10')}
              value={info.permanentAddress.address}
              onPressIn={() => setVisible(true)}
              underlineColorAndroid="transparent"
              selectTextOnFocus={false}
            />
            {/* //   } */}
            {/* // > */}
            <Text style={tw('text-base')}>{info.permanentAddress.address}</Text>
            {/* </Popover> */}
          </View>
        </View>
      </View>
    </View>
  )
}
