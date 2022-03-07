import { ScrollView, TextInput, View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import { format } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { tw } from '@/lib/tailwind'
export const CreateFormLeave = () => {
  //   const styles = StyleSheet.create({
  //     input: {
  //       height: 40,
  //       margin: 12,
  //       borderWidth: 1,
  //       padding: 10,
  //     },
  //   })
  const [text, setText] = useState('')
  const reasons = ['Annual Leave', 'Unpaid Leave']
  const [amount, setAmount] = useState(0)
  const amountDays = ['1/2 day', '1 day', 'Many days']
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false)

  const [dateAvailable, setDateAvailable] = useState(new Date())
  const [dateAvailable2, setDateAvailable2] = useState(new Date())

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true)
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false)
  }
  const handleConfirm = (date: Date) => {
    hideDatePicker()
    setDateAvailable(date)
  }
  const handleConfirm2 = (date: Date) => {
    hideDatePicker2()
    setDateAvailable2(date)
  }
  return (
    <View style={tw('flex relative flex-1 bg-gray-200 px-6 py-5')}>
      <Text style={tw('font-nunito mb-2')}> Leave Type * </Text>
      <View style={tw('h-16 w-95')}>
        <SelectDropdown
          data={reasons}
          // defaultValueByIndex={1}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            // setAmount(index)
          }}
          defaultButtonText={'Select leave type'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          buttonStyle={tw('bg-white rounded-lg h-13 w-90')}
          buttonTextStyle={tw('font-bold text-left font-nunito text-black')}
          renderDropdownIcon={(isOpened) => {
            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={tw('bg-white rounded-lg')}
          rowStyle={tw('border-b-1 bg-white border-gray-400')}
          rowTextStyle={tw('font-bold text-left font-nunito text-black')}
        />
      </View>
      <Text style={tw('font-nunito mb-2')}> Amount Type Of Leave * </Text>
      <View style={tw('h-16 w-95')}>
        <SelectDropdown
          data={amountDays}
          // defaultValueByIndex={1}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setAmount(index)
          }}
          defaultButtonText={'Select amount'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          buttonStyle={tw('bg-white rounded-lg h-13 w-90')}
          buttonTextStyle={tw('font-bold text-left font-nunito text-black')}
          renderDropdownIcon={(isOpened) => {
            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={tw('bg-white rounded-lg')}
          rowStyle={tw('border-b-1 bg-white border-gray-400')}
          rowTextStyle={tw('font-bold text-left font-nunito text-black')}
        />
      </View>
      <Text style={tw('font-nunito mb-2')}> Select Day / From Date * </Text>
      <View>
        <TouchableOpacity
          onPress={showDatePicker}
          style={tw(
            'items-center bg-white px-3 h-13 w-90 relative flex flex-row justify-items-start rounded-lg'
          )}
        >
          <Icon name="calendar" size={30} color="#FFBE55" />
          <View style={tw('flex-grow flex items-center')}>
            <Text style={tw('font-nunito text-base')}>{format(dateAvailable, 'dd-MM-yyyy')}</Text>
          </View>
          {/* <Icon reverse name="ios-american-football" type="ionicon" color="#517fa4" /> */}
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={dateAvailable}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {amount == 2 && (
        <View>
          <Text style={tw('font-nunito mb-2')}> To Date * </Text>
          <View>
            <TouchableOpacity
              onPress={showDatePicker2}
              style={tw(
                'items-center bg-white px-3 h-13 w-90 relative flex flex-row justify-items-start rounded-lg'
              )}
            >
              <Icon name="calendar" size={30} color="#FFBE55" />
              <View style={tw('flex-grow flex items-center')}>
                <Text style={tw('font-nunito text-base')}>
                  {format(dateAvailable2, 'dd-MM-yyyy')}
                </Text>
              </View>
              {/* <Icon reverse name="ios-american-football" type="ionicon" color="#517fa4" /> */}
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible2}
            date={dateAvailable2}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
          />
        </View>
      )}
      <Text style={tw('font-nunito mb-2')}> Reason * </Text>
      <TextInput
        style={tw('h-30 w-90 bg-white rounded-lg')}
        placeholder="Input your reason"
        placeholderTextColor=""
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
    </View>
  )
}
