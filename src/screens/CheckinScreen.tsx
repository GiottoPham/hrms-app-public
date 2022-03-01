import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'

import { tw } from '@/lib/tailwind'
export const CheckinScreen = () => {
  const { top } = useSafeAreaInsets()
  return (
    <View style={tw('flex flex-1 font-nunito text-white bg-white', { paddingTop: top })}>
      <Text>Login Viewasdasd</Text>
    </View>
  )
}
