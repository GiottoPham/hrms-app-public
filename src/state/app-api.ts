import * as Font from 'expo-font'

export const loadFont = () => {
  return Font.loadAsync({
    'nunito-regular': require('../../public/fonts/Nunito-Regular.ttf'),
    'nunito-semibold': require('../../public/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold': require('../../public/fonts/Nunito-Bold.ttf'),
  })
}
