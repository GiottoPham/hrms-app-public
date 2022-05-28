/* eslint-disable prettier/prettier */
import type { RootTabParamList } from '@/types/root'
import type { StackScreenProps } from '@react-navigation/stack'

import React, { Fragment, ReactNode, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Chip } from 'react-native-paper'
import { isAfter } from 'date-fns'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

import { tw } from '@/lib/tailwind'
import { useNotiToken } from '@/state/noti-queries'
import { useSendTodo } from '@/state/todo-mutation'
import { useCurrentUser } from '@/state/auth-queries'
import { useEmployees } from '@/state/employee-queries'
import { check } from 'prettier'

// const { width: vw } = Dimensions.get('window')
// moment().format('YYYY/MM/DD')

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#ffac2f',
    borderLeftWidth: 2,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 30,
    width: '100%',
    height: 350,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeef7',
  },
})
export const CreateTask = ({
  route,
  navigation,
}: StackScreenProps<RootTabParamList, 'CreateTask'>) => {
  // const createNewCalendar = route.params.createNewCalendar ?? (() => null)
  // const currentDate = route.params?.currentDate ?? (() => null)
  const { tokenList } = useNotiToken()
  const { employees } = useEmployees()
  const emp_arr = employees?.map((item) => ({
    id: item.id.toString(),
    title: `${item.personalDetail.firstName} ${item.personalDetail.lastName}`,
  }))
  const [empsSelect, setEmpsSelect] = useState<{ id: string; title: string, node: ReactNode }[]>([])
  // let emps_select_name = ''
  console.log(emp_arr)
  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`]: {
      selected: true,
    },
  })
  const [currentDay, setCurrentDay] = useState(moment().format())
  const [checked, setChecked] = useState(1)
  const [taskText, setTaskText] = useState('')
  const [notesText, setNotesText] = useState('')
  const [isAlarmSet, setAlarmSet] = useState(false)
  const [alarmTime, setAlarmTime] = useState(moment().format())
  const [alarmTime2, setAlarmTime2] = useState(moment().format())

  const [label, setLabel] = useState('task')
  const [location, setLocation] = useState('')
  const [selectedChip, setSelectedChip] = useState(1)
  const [selectedColor, setSeclectedColor] = useState('')
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false)
  const [isDateTimePickerVisible2, setDateTimePickerVisible2] = useState(false)

  // useEffect(() => {
  //   if (keyboardHeight > 0) {
  //     setVisibleHeight(Dimensions.get('window').height - keyboardHeight)
  //   } else if (keyboardHeight === 0) {
  //     setVisibleHeight(Dimensions.get('window').height)
  //   }
  // }, [keyboardHeight])

  // const handleAlarmSet = () => {
  //   setAlarmSet(!isAlarmSet)
  // }

  // const synchronizeCalendar = async () => {
  //   const calendarId = await createNewCalendar()
  //   try {
  //     const createEventId = await addEventsToCalendar(calendarId)
  //     handleCreateEventData(createEventId)
  //   } catch (e) {
  //     Alert.alert(e.message)
  //   }
  // }

  // const addEventsToCalendar = async (calendarId) => {
  //   const event = {
  //     title: taskText,
  //     notes: notesText,
  //     startDate: moment(alarmTime).add(0, 'm').toDate(),
  //     endDate: moment(alarmTime).add(5, 'm').toDate(),
  //     timeZone: Localization.timezone,
  //   }

  //   try {
  //     const createEventAsyncResNew = await Calendar.createEventAsync(calendarId.toString(), event)
  //     return createEventAsyncResNew
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const showDateTimePicker = () => setDateTimePickerVisible(true)
  const showDateTimePicker2 = () => setDateTimePickerVisible2(true)

  const hideDateTimePicker = () => setDateTimePickerVisible(false)
  const hideDateTimePicker2 = () => setDateTimePickerVisible2(false)

  // const handleCreateEventData = async (createEventId) => {
  //   const creatTodo = {
  //     key: uuidv4(),
  //     date: `${moment(currentDay).format('YYYY')}-${moment(currentDay).format('MM')}-${moment(
  //       currentDay
  //     ).format('DD')}`,
  //     todoList: [
  //       {
  //         key: uuidv4(),
  //         title: taskText,
  //         notes: notesText,
  //         alarm: {
  //           time: alarmTime,
  //           isOn: isAlarmSet,
  //           createEventAsyncRes: createEventId,
  //         },
  //         color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
  //           Math.random() * Math.floor(256)
  //         )},${Math.floor(Math.random() * Math.floor(256))})`,
  //       },
  //     ],
  //     markedDot: {
  //       date: currentDay,
  //       dots: [
  //         {
  //           key: uuidv4(),
  //           color: '#2E66E7',
  //           selectedDotColor: '#2E66E7',
  //         },
  //       ],
  //     },
  //   }
  //   navigation.navigate(Routes.HOME)
  //   await updateTodo(creatTodo)
  //   updateCurrentTask(currentDate)
  // }

  const handleDatePicked = (date: moment.MomentInput) => {
    const selectedDatePicked = currentDay
    const hour = moment(date).hour()
    const minute = moment(date).minute()
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute)
    setAlarmTime(newModifiedDay)
    // if (isAfter(new Date(alarmTime), new Date(alarmTime2))) {
    //   console.log(new Date(alarmTime))
    //   console.log(new Date(alarmTime2))

    //   setAlarmTime2(newModifiedDay)
    // }
    hideDateTimePicker()
  }
  const handleDatePicked2 = (date: moment.MomentInput) => {
    const selectedDatePicked = currentDay
    const hour = moment(date).hour()
    const minute = moment(date).minute()
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute)
    setAlarmTime2(newModifiedDay)
    hideDateTimePicker2()
  }
  const { sendTodo } = useSendTodo()
  const { currentUser } = useCurrentUser()
  return (
    <Fragment>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="time"
        date={new Date()}
        isDarkModeEnabled
      />
      <DateTimePicker
        isVisible={isDateTimePickerVisible2}
        onConfirm={handleDatePicked2}
        onCancel={hideDateTimePicker2}
        minimumDate={new Date(alarmTime)}
        mode="time"
        date={new Date()}
        isDarkModeEnabled
      />
      <View>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        >
          <View style={tw('w-full flex flex-col justify-center items-center h-[350px]')}>
            <CalendarList
              style={{
                width: 350,
                height: 350,
              }}
              current={currentDay}
              minDate={moment().format()}
              maxDate={moment().startOf('day').add(6, 'd').format()}
              horizontal
              pastScrollRange={0}
              pagingEnabled
              calendarWidth={350}
              onDayPress={(day) => {
                setSelectedDay({
                  [day.dateString]: {
                    selected: true,
                  },
                })
                setCurrentDay(day.dateString)
                setAlarmTime(day.dateString)
              }}
              monthFormat="yyyy MMMM"
              hideArrows
              markingType="custom"
              theme={{
                selectedDayBackgroundColor: '#ffac2f',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#ffac2f',
                calendarBackground: 'transparent',
                textDisabledColor: '#c5c7c9',
                textDayFontWeight: 'bold',
              }}
              markedDates={selectedDay}
            />
          </View>
          <View style={styles.taskContainer}>
            <TextInput
              style={styles.title}
              onChangeText={setTaskText}
              value={taskText}
              placeholder="What do you need to do?"
              placeholderTextColor="#adb5bd"
            />
            <View style={styles.notesContent} />
            <View>
              <Text style={styles.notes}>Label </Text>
              <View style={tw('flex flex-row mb-5 mt-2')}>
                <Chip
                  icon={'briefcase-outline'}
                  style={selectedChip === 1 ? tw('w-20 bg-yellow-500') : tw('w-20')}
                  selected={selectedChip === 1}
                  onPress={() => {
                    setSelectedChip(1)
                    // if(selectedChip===1) setSeclectedColor('bg-yellow-500')
                    // else setSeclectedColor('')
                  }}
                >
                  <Text style={tw('text-black font-nunito-bold text-base')}>Task</Text>
                </Chip>
                <Chip
                  icon={'card-account-phone'}
                  style={selectedChip === 2 ? tw('w-24 bg-yellow-500 ml-4') : tw('w-24 ml-4')}
                  selected={selectedChip === 2}
                  onPress={() => {
                    setSelectedChip(2)
                    // if (selectedChip === 2) setSeclectedColor('bg-yellow-500')
                    // else setSeclectedColor('')
                  }}
                >
                  <Text style={tw('text-black font-nunito-bold text-base')}>Meeting</Text>
                </Chip>
                <Chip
                  icon={'wizard-hat'}
                  style={selectedChip === 3 ? tw('w-22 bg-yellow-500 ml-4') : tw('w-22 ml-4')}
                  selected={selectedChip === 3}
                  onPress={() => {
                    setSelectedChip(3)
                    // if (selectedChip === 2) setSeclectedColor('bg-yellow-500')
                    // else setSeclectedColor('')
                  }}
                >
                  <Text style={tw('text-black font-nunito-bold text-base')}>Event</Text>
                </Chip>
              </View>
              {/* <TextInput
              style={{
                height: 25,
                fontSize: 19,
                marginTop: 3,
              }}
              onChangeText={setLabel}
              value={label}
              placeholder="Type of event"
              placeholderTextColor="#adb5bd"
              editable={false}
            /> */}
            </View>
            <View>
              <Text style={styles.notes}>Notes</Text>
              <TextInput
                style={{
                  height: 25,
                  fontSize: 19,
                  marginTop: 3,
                }}
                onChangeText={setNotesText}
                value={notesText}
                placeholder="Enter notes about the task/event."
                placeholderTextColor="#adb5bd"
              />
            </View>
            <View style={styles.separator} />
            {selectedChip != 1 && (
              <>
                <View>
                  <Text style={styles.notes}>Location</Text>
                  <TextInput
                    style={{
                      height: 25,
                      fontSize: 19,
                      marginTop: 3,
                    }}
                    onChangeText={setLocation}
                    value={location}
                    placeholder="Enter location of event/meeting."
                    placeholderTextColor="#adb5bd"
                  />
                </View>
                <View style={styles.separator} />
              </>
            )}

            <View>
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Time to start
              </Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker()}
                style={{
                  height: 25,
                  marginTop: 3,
                }}
              >
                <Text style={{ fontSize: 19 }}>{moment(alarmTime).format('h:mm A')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View>
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Time to end
              </Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker2()}
                style={{
                  height: 25,
                  marginTop: 3,
                }}
              >
                <Text style={{ fontSize: 19 }}>{moment(alarmTime2).format('h:mm A')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />
            <View>
              <Text style={styles.notes}>To </Text>
              <View style={tw('mt-2')}>
                <RadioGroup
                  color="#ffac2f"
                  style={tw('flex flex-row ml--2 mb-1')}
                  onSelect={(value: number) => {
                    setChecked(value)
                    if(value==0) setEmpsSelect([])
                  }}
                >
                  <RadioButton value={1}>
                    <Text style={tw('text-lg')}>All </Text>
                  </RadioButton>

                  <RadioButton style={tw('ml-5')} value={2}>
                    <Text style={tw('text-lg')}>Specific Employees</Text>
                  </RadioButton>
                </RadioGroup>
               {checked==1 && <View style={tw('flex flex-row flex-wrap')}>{empsSelect.map(item=>item.node)}</View>}

                {checked == 1 && <View style={tw('mb-5')}>
                  <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    initialValue={{ id: '1' }} // or just '2'
                    dataSet={emp_arr}
                    inputContainerStyle={{
                      backgroundColor: '#ffac2a',
                      borderRadius: 25,
                    }}
                    onSelectItem={(item) => {
                      // empsChips.push(<Chip></Chip>)

                      if (item && !empsSelect.find((value) => value.id == item.id)) {
                        setEmpsSelect([...empsSelect, { id: item.id, title: item.title as string, node: <Chip
                          onClose={() =>
                            setEmpsSelect(empsSelect.filter((value) => value.id != item.id))
                          }
                        >
                          <Text>{item.title}</Text>
                        </Chip> }])
                      }
                    }}
                    suggestionsListContainerStyle={tw('flex z-30 h-30 z-[99999]')}
                    debounce={600}
                    position={'relative'}
                    direction={'down'}
                    containerStyle={tw('flex h-30 z-50')}
                    renderItem={(item, text) => (
                      <Text style={{ color: '#444444', padding: 15 }}>{item.title}</Text>
                    )}
                  />
                </View>
}
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={taskText === '' || isAfter(new Date(alarmTime), new Date(alarmTime2))}
            style={[
              styles.createTaskButton,
              {
                backgroundColor:
                  taskText === '' || isAfter(new Date(alarmTime), new Date(alarmTime2))
                    ? '#ffe6c0'
                    : '#ffac2f',
              },
            ]}
            onPress={() => {
              console.log(checked)
              console.log(empsSelect)
              // setEmpsSelect(empsSelect.splice(0,empsSelect.length))
              console.log(empsSelect.map(item=>Number(item.id)))
              // sendNoti({
              //   to:
              //     tokenList == undefined || tokenList == []
              //       ? [
              //           'ExponentPushToken[nywcawIdX9ivla1Drzr2y3]',
              //           'ExponentPushToken[HBEcdaIu5Kk4PL1LYdpXop]',
              //         ]
              //       : tokenList,
              //   title: `You have a new event/task: ${taskText}`,
              //   body: `Took place at ${moment(alarmTime).format('DD/MM HH:mm')}`,
              // })
              // sendTodo({
              //   title: taskText,
              //   notes: notesText,
              //   time: new Date(alarmTime).toISOString(),
              //   userId: currentUser?.id as number,
              // }).then(alert('Your event has been scheduled!'))
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#fff',
              }}
            >
              ADD YOUR EVENT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Fragment>
  )
}
