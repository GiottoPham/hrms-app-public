import { ScrollView, View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'

// import Icon from 'react-native-vector-icons/FontAwesome5'

import { tw } from '@/lib/tailwind'
export const LeaveScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [dateAvailable, setDateAvailable] = useState(new Date())
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    hideDatePicker()
    setDateAvailable(date)
  }
  return (
    <View style={tw('flex flex-1 bg-white items-center py-3')}>
      <TouchableOpacity
        onPress={showDatePicker}
        style={tw(
          'items-center bg-gray-200 px-3 h-13 w-45 relative flex flex-row justify-center rounded-lg'
        )}
      >
        <Icon name="calendar" size={30} color="#FFBE55" />
        <View style={tw('flex-grow flex items-center')}>
          <Text>{format(dateAvailable, 'MM-dd-yyyy')}</Text>
        </View>
        {/* <Icon reverse name="ios-american-football" type="ionicon" color="#517fa4" /> */}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={dateAvailable}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 20,
//   },
//   datePickerStyle: {
//     width: 200,
//     marginTop: 20,
//   },
// })
