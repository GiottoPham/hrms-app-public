import { ScrollView, View, Text } from 'react-native'

import { tw } from '@/lib/tailwind'
import { IgnoreComponent } from './IgnoreContainer'
export const LeaveIgnore = () => {
  return (
    <View style={tw('flex flex-1 bg-gray-200')}>
      <ScrollView>
        <IgnoreComponent/>
      </ScrollView>
    </View>
  )
}