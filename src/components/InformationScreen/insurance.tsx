import type { InsuranceInputParams } from '@/types/employee'

import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import IconMate from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAw from 'react-native-vector-icons/FontAwesome5'
import { format } from 'date-fns'

import { tw } from '@/lib/tailwind'
import { useCities } from '@/state/countries-queries'
function convertStringToDate(date: string): string {
  const newDate = new Date(date)
  console.log('xxx')
  return format(newDate, 'dd-MM-yyyy')
}
export const Insurance = ({ info }: { info: InsuranceInputParams }) => {
  const { cities } = useCities()

  const kcbFake = [
    {
      id: 1,
      name: 'Bệnh viện Giao thông Vận tải TP HCM',
    },
    {
      id: 2,
      name: 'Trung tâm y tế Quận 3',
    },
    {
      id: 3,
      name: 'Phòng khám đa khoa (thuộc Cty TNHH PKđa khoa Sài Gòn - TT khám bệnh số 2)',
    },
    {
      id: 4,
      name: 'Phòng khám đa khoa thuộc Công ty TNHH dịch vụ chăm sóc sức khỏe Song An',
    },
  ]
  if (!info) return <ActivityIndicator size="small" color="#0000ff" />
  const health = info.health
  const social = info.social
  const unemployment = info.unemployment
  console.log(info)
  return (
    <View style={tw('px-5 pb-5')}>
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
                  value={health != null && health.number != null ? health.number : 'No Information'}
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
                  value={
                    health != null && health.issue_date != null
                      ? convertStringToDate(health.issue_date)
                      : 'No Information'
                  }
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
                  value={
                    health != null && health.from_date != null
                      ? convertStringToDate(health.from_date)
                      : 'No Information'
                  }
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
                  value={
                    health != null && health.to_date != null
                      ? convertStringToDate(health.to_date)
                      : 'No Information'
                  }
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
                  value={
                    info != null && info.cityId != null
                      ? cities?.find((city) => city.province_id == info.cityId)?.province_name
                      : 'No Information'
                  }
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
                  value={
                    info != null && info.kcbId != null
                      ? kcbFake.find((item) => item.id == info.kcbId)?.name
                      : 'No Information'
                  }
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={tw('flex flex-row mb-2')}>
        <View style={tw('mt-4 w-95 border-yellow-600 border-t h-45 ')}>
          <View style={tw('h-5 w-35 -ml-4 items-center bg-black-900 top--3 ')}>
            <Text style={tw('text-yellow-400 text-base')}>Social Insurance</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Number</Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconAw name="id-card" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value={social != null && social.number != null ? social.number : 'No Information'}
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
                  value={
                    health != null && health.issue_date != null
                      ? convertStringToDate(social.issue_date)
                      : 'No Information'
                  }
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
                  value={
                    health != null && health.from_date != null
                      ? convertStringToDate(social.from_date)
                      : 'No Information'
                  }
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
                  value={
                    health != null && health.to_date != null
                      ? convertStringToDate(social.to_date)
                      : 'No Information'
                  }
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={tw('flex flex-row mb-2')}>
        <View style={tw('mt-4 w-95 border-yellow-600 border-t h-50 ')}>
          <View style={tw('h-5 w-50 -ml-4 items-center bg-black-900 top--3 ')}>
            <Text style={tw('text-yellow-400 text-base')}>Unemployment Insurance</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Number</Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconAw name="id-card" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value={
                    unemployment != null && unemployment.number != null
                      ? unemployment.number
                      : 'No Information'
                  }
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
                  value={
                    unemployment != null && unemployment.issue_date != null
                      ? convertStringToDate(unemployment.issue_date)
                      : 'No Information'
                  }
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
                  value={
                    unemployment != null && unemployment.from_date != null
                      ? convertStringToDate(unemployment.from_date)
                      : 'No Information'
                  }
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
                  value={
                    unemployment != null && unemployment.to_date != null
                      ? convertStringToDate(unemployment.to_date)
                      : 'No Information'
                  }
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
