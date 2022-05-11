import type { JobDetailInputParams } from '@/types/employee'

import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import IconMate from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAw from 'react-native-vector-icons/FontAwesome5'
import IconMa from 'react-native-vector-icons/MaterialIcons'
import Popover from 'react-native-popover-view'
import { format } from 'date-fns'

import { tw } from '@/lib/tailwind'
import { useJobs } from '@/state/job-queries'
export const JobSalary = ({ info }: { info: JobDetailInputParams }) => {
  // let realSalary = info.salary
  // if (info.salaryGroup == 1) realSalary = realSalary * 1.1
  const [visible, setVisible] = useState(false)
  const { jobDetail } = useJobs(info.jobId as number)

  if (!info || !jobDetail) return <ActivityIndicator size="small" color="#0000ff" />

  return (
    <View style={tw('px-5')}>
      <View style={tw('flex flex-row ')}>
        <View style={tw('mt-4 w-95 border-yellow-600 border-t h-50 ')}>
          <View style={tw('h-5 w-35 -ml-4 items-center bg-black-900 top--3 ')}>
            <Text style={tw('text-yellow-400 text-base')}>Job Information</Text>
          </View>
          <View style={tw('flex flex-row mb-2 ml-1')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Join Date</Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconAw name="calendar-alt" size={20} color="#ffbe55" style={tw('-mr-5 ')} />

                <TextInput
                  style={tw('h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value={format(new Date(info.joinDate), 'dd-MM-yyyy')}
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
                      value={jobDetail?.title}
                      underlineColorAndroid="transparent"
                      editable={false}
                      onPressIn={() => setVisible(true)}
                      selectTextOnFocus={false}
                    />
                  }
                >
                  <Text style={tw('text-base')}>{jobDetail?.title}</Text>
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
                  value="129379493"
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
        <View style={tw('mt-1 w-95 border-yellow-600 border-t h-80 ')}>
          <View style={tw('h-5 w-35 -ml-4 items-center bg-black-900 top--3 ')}>
            <Text style={tw('text-yellow-400 text-base')}>Salary Information</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <View>
              <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Salary </Text>
              <View style={tw('flex flex-row items-center ')}>
                <IconAw name="money-check-alt" size={20} color="#ffbe55" style={tw('-mr-5')} />
                <TextInput
                  style={tw('h-10 w-95 bg-transparent border-b border-yellow-600 text-white px-10')}
                  value={info.salary.toString()}
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>
          </View>
          {info.bonus.map((obj, index) => (
            <View style={tw('flex flex-row mb-2 ml-1')} key={index}>
              <View>
                <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Bonus Name</Text>
                <View style={tw('flex flex-row items-center ')}>
                  <IconAw name="check-circle" size={20} color="#ffbe55" style={tw('-mr-5')} />
                  <TextInput
                    style={tw(
                      'h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10'
                    )}
                    value={obj.bonusName}
                    underlineColorAndroid="transparent"
                    editable={false}
                    selectTextOnFocus={false}
                  />
                </View>
              </View>
              <View style={tw('ml-5')}>
                <Text style={tw('font-nunito text-yellow-400 text-base mt-1')}>Amount</Text>
                <View style={tw('flex flex-row items-center')}>
                  <IconAw name="money-bill" size={20} color="#ffbe55" style={tw('-mr-5')} />
                  <TextInput
                    style={tw(
                      'h-10 w-45 bg-transparent border-b border-yellow-600 text-white px-10'
                    )}
                    value={obj.bonusAmount.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                    underlineColorAndroid="transparent"
                    editable={false}
                    selectTextOnFocus={false}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
