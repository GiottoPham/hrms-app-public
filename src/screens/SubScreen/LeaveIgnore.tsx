import { ScrollView, View, Text } from 'react-native'

import { tw } from '@/lib/tailwind'
export const LeaveIgnore = () => {
  return (
    <View style={tw('flex flex-1 bg-white')}>
      <ScrollView>
        <Text>Leave Ignore</Text>
      </ScrollView>
    </View>
  )
}
