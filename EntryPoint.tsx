import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { App } from './App'

export const EntryPoint = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <App />
    </SafeAreaProvider>
  )
}
