import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export const App = () => {
  return (
    <View style={styles.container}>
      <Text>T code trong 30s do you see it</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
