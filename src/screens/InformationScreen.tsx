/* eslint-disable import/no-duplicates */
import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import IconIo from 'react-native-vector-icons/Ionicons'
import IconMate from 'react-native-vector-icons/MaterialIcons'

import { tw } from '@/lib/tailwind'
import { BasicInfo } from '@/components/InformationScreen/basicInfo'
import { Insurance } from '@/components/InformationScreen/insurance'
import { JobSalary } from '@/components/InformationScreen/jobSalary'
import { useEmployee } from '@/state/employee-queries'
import { useJobs } from '@/state/job-queries'
import { useCurrentUser } from '@/state/auth-queries'
export const InformationScreen = () => {
  const { currentUser } = useCurrentUser()
  const { employee, isLoading } = useEmployee(currentUser?.eid as number)
  const { jobDetail } = useJobs(employee?.jobDetail.jobId as number)
  const [basic, setBasic] = useState(false)
  const [job, setJob] = useState(false)
  const [insurance, setInsurance] = useState(false)
  const triggerBasic = () => {
    setBasic(true)
    setJob(false)
    setInsurance(false)
  }
  const triggerJob = () => {
    setBasic(false)
    setJob(true)
    setInsurance(false)
  }
  const triggerInsurance = () => {
    setBasic(false)
    setJob(false)
    setInsurance(true)
  }
  useEffect(() => {
    setBasic(true)
  }, [])
  if (isLoading || !jobDetail || !employee) return null
  // eslint-disable-next-line no-console
  return (
    <View style={tw('flex flex-1 bg-gray-200')}>
      <ImageBackground
        source={require('@/assets/images/bg-profile.jpg')}
        resizeMode="stretch"
        blurRadius={3}
        style={tw('h-57 w-full flex justify-center items-center')}
      >
        <View style={tw('justify-evenly items-center flex-row')}>
          <Avatar
            size={120}
            rounded
            source={{
              uri: employee.personalDetail.avatar,
            }}
            title={'Nguyen'}
            avatarStyle={tw('border-2 border-yellow-600')}
            containerStyle={tw('mt-5')}
          />
        </View>
        <Text style={tw('text-white mt-2 font-nunito-bold text-xl')}>
          {employee?.personalDetail.firstName} {employee?.personalDetail.lastName}
        </Text>
        <Text style={tw('text-white font-nunito text-base')}>{jobDetail.title}</Text>
        <View style={tw('justify-evenly items-center flex-row py-3')}>
          <TouchableOpacity
            style={tw('justify-evenly flex-row items-center h-10 w-1/3')}
            onPress={triggerBasic}
          >
            <IconIo name={'person'} size={18} color="#FFBE55" />
            <Text style={tw('font-nunito text-yellow-600 text-base')}>Basic Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw(
              'justify-evenly flex-row items-center h-10 w-1/3 border-l-2 border-yellow-600'
            )}
            onPress={triggerJob}
          >
            <IconMate name={'work'} size={18} color="#FFBE55" />
            <Text style={tw('font-nunito text-yellow-600 text-base')}>Job & Salary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw(
              'justify-evenly flex-row items-center h-10 w-1/3 border-l-2 border-yellow-600'
            )}
            onPress={triggerInsurance}
          >
            <IconMate name={'local-hospital'} size={18} color="#FFBE55" />
            <Text style={tw('font-nunito text-yellow-600 text-base')}>Insurance</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ScrollView style={tw('bg-black-900')}>
        {basic && <BasicInfo info={employee?.personalDetail} />}
        {insurance && <Insurance info={employee.insuranceDetail} />}
        {job && <JobSalary info={employee.jobDetail} />}
      </ScrollView>
    </View>
  )
}
