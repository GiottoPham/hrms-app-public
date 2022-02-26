import { ScrollView, View, Text } from 'react-native'

import { tw } from '@/lib/tailwind'
export const NotiScreen = () => {
  return (
    <View style={tw('flex flex-1 bg-white')}>
      <ScrollView>
        <Text>Login View</Text>
      </ScrollView>
    </View>
  )
}
