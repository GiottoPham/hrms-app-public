import type { RootTabParamList } from '@/types/root'
import type { StackScreenProps } from '@react-navigation/stack'

import React, { Fragment, useEffect, useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { CalendarList } from 'react-native-calendars'
import moment from 'moment'
import * as Calendar from 'expo-calendar'
import * as Localization from 'expo-localization'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tw } from '@/lib/tailwind'
import { getNotiTokens, sendNoti } from '@/state/noti-api'
import { useNotiToken } from '@/state/noti-queries'

const { width: vw } = Dimensions.get('window')
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
    height: 330,
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
  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`]: {
      selected: true,
    },
  })
  const [currentDay, setCurrentDay] = useState(moment().format())
  const [taskText, setTaskText] = useState('')
  const [notesText, setNotesText] = useState('')
  const [isAlarmSet, setAlarmSet] = useState(false)
  const [alarmTime, setAlarmTime] = useState(moment().format())
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false)
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

  const hideDateTimePicker = () => setDateTimePickerVisible(false)

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

  const handleDatePicked = (date) => {
    console.log('he')
    const selectedDatePicked = currentDay
    const hour = moment(date).hour()
    const minute = moment(date).minute()
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute)
    setAlarmTime(newModifiedDay)
    hideDateTimePicker()
  }

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

      <View>
        <ScrollView
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
              <Text style={styles.notes}>Notes</Text>
              <TextInput
                style={{
                  height: 25,
                  fontSize: 19,
                  marginTop: 3,
                }}
                onChangeText={setNotesText}
                value={notesText}
                placeholder="Enter notes about the task."
                placeholderTextColor="#adb5bd"
              />
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
                Times
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
          </View>
          <TouchableOpacity
            disabled={taskText === ''}
            style={[
              styles.createTaskButton,
              {
                backgroundColor: taskText === '' ? '#ffac2f' : '#ffac2f',
              },
            ]}
            onPress={() => {
              console.log('xxxxx')
              sendNoti({
                to:
                  tokenList == undefined || tokenList == []
                    ? [
                        'ExponentPushToken[nywcawIdX9ivla1Drzr2y3]',
                        'ExponentPushToken[HBEcdaIu5Kk4PL1LYdpXop]',
                      ]
                    : tokenList,
                title: `You have a new event/task: ${taskText}`,
                body: `Took place at ${moment(alarmTime).format('DD/MM HH:mm')}`,
              })
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#fff',
              }}
            >
              ADD YOUR TASK
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Fragment>
  )
}
