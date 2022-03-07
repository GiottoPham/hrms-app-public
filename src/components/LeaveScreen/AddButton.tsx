import type { RootStackParamList } from '@/types/root'
import type { StackNavigationProp } from '@react-navigation/stack'

import { TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

import { tw } from '@/lib/tailwind'
export const AddButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  return (
    <TouchableOpacity
      style={tw(
        'border-2 border-yellow-200 items-center justify-center w-13 absolute bottom-4 right-2 h-13 bg-yellow-400 rounded-full'
      )}
      onPress={() => navigation.navigate('BottomTabs', { screen: 'CreateLeave' })}
    >
      <Icon name="plus" size={30} color="#ffffff" />
    </TouchableOpacity>
  )
}
