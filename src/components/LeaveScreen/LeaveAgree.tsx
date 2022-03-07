import { ScrollView, View, Text } from 'react-native'

import { tw } from '@/lib/tailwind'
import { AgreeComponent } from './AcceptContainer'
export const LeaveAccept = () => {
  return (
    <View style={tw('flex flex-1 bg-gray-200')}>
      <ScrollView>
        <AgreeComponent/>
      </ScrollView>
    </View>
  )
}
