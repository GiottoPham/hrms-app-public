import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/lib/react-query'

import { App } from './App'

export const EntryPoint = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <App />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
