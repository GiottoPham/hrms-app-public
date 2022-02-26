import type { DrawerParamList } from '@/types/root'

import { createDrawerNavigator } from '@react-navigation/drawer'

import { BottomTabNavigator } from './BottomTabNavigation'

const Drawer = createDrawerNavigator<DrawerParamList>()

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="BottomTabs">
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  )
}
