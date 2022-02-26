import { NavigationContainer } from '@react-navigation/native'

import { RootNavigator } from '@/navigation/RootNavigator'
import { useFonts } from '@/state/app-queries'

export const App = () => {
  const { isLoading } = useFonts()

  if (isLoading) {
    return null
  }

  return (
    /**
     * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
     * https://reactnavigation.org/docs/getting-started
     */
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}
