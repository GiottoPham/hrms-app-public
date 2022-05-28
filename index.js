import { registerRootComponent } from 'expo'
import { LogBox } from 'react-native'

import { EntryPoint } from './EntryPoint'
LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications
registerRootComponent(EntryPoint)
