import { ScrollView, View, Text } from 'react-native'

import { tw } from '@/lib/tailwind'

import { PendingComponent } from './PendingContainer'
import { AddButton } from './AddButton'
export const LeavePending = () => {
  return (
    <View style={tw('flex relative flex-1 bg-gray-200')}>
      <ScrollView>
        <PendingComponent />
      </ScrollView>
    </View>
  )
}
