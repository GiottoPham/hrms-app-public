import type { Todo } from '@/types/todo'
import type { StackScreenProps } from '@react-navigation/stack'
import type { RootStackParamList } from '@/types/root'
import type { Subscription } from 'expo-modules-core'

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import moment from 'moment'
import * as Calendar from 'expo-calendar'
import CalendarStrip from 'react-native-calendar-strip'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Localization from 'expo-localization'

import { Task } from '@/components/NotiSccreen/Task'
import { tw } from '@/lib/tailwind'
import { useTodoParams } from '@/state/todo-params'
import { useTodos } from '@/state/todos-queries'
import { useUpdateTodo } from '@/state/todo-mutation'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})
const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    padding: 20,
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#FFAC2F',
    width: 100,
    height: 38,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
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
    borderColor: '#FFAC2F',
    borderLeftWidth: 2,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 330,
    width: 327,
    borderRadius: 20,
    shadowColor: '#FFAC2F',
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
})

export const NotiScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'Notification'>) => {
  //set Notifications
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification>(
    null as unknown as Notifications.Notification
  )
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token as string))

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current as Subscription)
      Notifications.removeNotificationSubscription(responseListener.current as Subscription)
    }
  }, [])
  //************* */
  const { todoParams, setTodoParams } = useTodoParams()
  console.log(todoParams)
  const { todos = [] } = useTodos(todoParams)
  const [currentDate, setCurrentDate] = useState<moment.Moment>(moment(new Date()))
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Todo>()
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false)
  const handleModalVisible = () => {
    setModalVisible(!isModalVisible)
  }

  const showDateTimePicker = () => setDateTimePickerVisible(true)

  const hideDateTimePicker = () => setDateTimePickerVisible(false)

  const handleDatePicked = (date: Date) => {
    const prevSelectedTask = JSON.parse(JSON.stringify(selectedTask))
    const selectedDatePicked = prevSelectedTask.alarm.time
    const hour = moment(date).hour()
    const minute = moment(date).minute()
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute)
    prevSelectedTask.alarm.time = newModifiedDay
    setSelectedTask(prevSelectedTask)
    hideDateTimePicker()
  }

  const updateAlarm = async () => {
    const calendarId = await createNewCalendar()
    const event = {
      title: selectedTask?.title || '',
      notes: selectedTask?.notes || '',
      startDate: moment(selectedTask?.time).add(0, 'm').toDate(),
      endDate: moment(selectedTask?.time).add(5, 'm').toDate(),
      timeZone: Localization.timezone,
      alarms: [
        {
          relativeOffset: 3,
        },
      ],
    }
    await Calendar.createEventAsync(calendarId?.toString() || '', event)
  }
  const createNewCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await Calendar.getDefaultCalendarAsync()
        : { isLocalAccount: true, name: 'Google Calendar' }
    const newCalendar = {
      title: 'Personal',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId: (defaultCalendarSource as Calendar.Calendar).sourceId,
      source: (defaultCalendarSource as Calendar.Calendar).source,
      name: 'internal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount: 'personal',
    }

    let calendarId = null

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar)
    } catch (e) {
      // Alert.alert(e.message)
    }

    return calendarId
  }
  const { updateTodo } = useUpdateTodo()
  console.log(todos)
  return (
    <Fragment>
      {selectedTask !== null && (
        <Task {...{ setModalVisible, isModalVisible }}>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
            mode="time"
            date={new Date()}
            isDarkModeEnabled
          />
          <View style={styles.taskContainer}>
            <TextInput
              style={styles.title}
              onChangeText={(text) => {
                const prevSelectedTask = JSON.parse(JSON.stringify(selectedTask))
                prevSelectedTask.title = text
                setSelectedTask(prevSelectedTask)
              }}
              value={selectedTask?.title}
              placeholder="What do you need to do?"
            />
            <View style={styles.notesContent} />
            <View>
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Notes
              </Text>
              <TextInput
                style={{
                  height: 25,
                  fontSize: 19,
                  marginTop: 3,
                }}
                onChangeText={(text) => {
                  const prevSelectedTask = JSON.parse(JSON.stringify(selectedTask))
                  prevSelectedTask.notes = text
                  setSelectedTask(prevSelectedTask)
                }}
                value={selectedTask?.notes}
                placeholder="Enter notes about the task."
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
              <View style={tw('flex flex-row justify-between items-center')}>
                <TouchableOpacity
                  onPress={() => showDateTimePicker()}
                  style={{
                    height: 25,
                    marginTop: 3,
                  }}
                >
                  <Text style={{ fontSize: 19 }}>
                    {moment(selectedTask?.time || moment()).format('h:mm A')}
                  </Text>
                </TouchableOpacity>
                <View style={tw('flex flex-row')}>
                  <Pressable
                    style={tw(
                      'bg-primary rounded-full w-10 h-10 flex items-center justify-center mr-2'
                    )}
                    onPress={async () => {
                      await updateAlarm()
                      Alert.alert('Successful create event')
                      setModalVisible(false)
                    }}
                  >
                    <Icon name={'notifications'} size={25} color="black" />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  handleModalVisible()
                  updateTodo({
                    id: selectedTask?.id as number,
                    title: selectedTask?.title || '',
                    notes: selectedTask?.notes || '',
                    time: new Date(selectedTask?.time as string).toISOString(),
                  })
                }}
                style={styles.updateButton}
              >
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Task>
      )}
      <SafeAreaView style={tw('flex-1 font-nunito')}>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'background',
            duration: 50,
            highlightColor: '#fff',
          }}
          style={{
            height: 100,
          }}
          calendarHeaderStyle={{ color: '#000000' }}
          dateNameStyle={{ color: '#BBBBBB' }}
          highlightDateContainerStyle={{
            backgroundColor: '#FFAC2F',
          }}
          highlightDateNumberStyle={{ color: 'white' }}
          highlightDateNameStyle={{ color: 'white' }}
          disabledDateNameStyle={{ color: 'grey' }}
          datesWhitelist={[
            { start: moment(todoParams.fromDateTime), end: moment(todoParams.toDateTime) },
          ]}
          iconContainer={{ flex: 0.1 }}
          markedDates={todos.map((todo) => ({
            date: moment(todo.time),
            dots: [
              {
                color:
                  moment(new Date(todo.time)).diff(moment().startOf('day'), 'days') === 0
                    ? 'red'
                    : moment(new Date(todo.time)).diff(moment().startOf('day'), 'days') === 1
                    ? new Date(todo.time).getDate() ===
                      new Date(currentDate.toISOString()).getDate()
                      ? 'white'
                      : '#FFAC2F'
                    : 'green',
              },
            ],
          }))}
          selectedDate={currentDate}
          onDateSelected={(date) => {
            setCurrentDate(date)
          }}
        />
        <TouchableOpacity style={styles.viewTask}>
          <MuiIcon
            name={'plus'}
            size={30}
            color="black"
            onPress={() => navigation.navigate('BottomTabs', { screen: 'CreateTask' })}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: Dimensions.get('window').height - 170,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 200,
            }}
          >
            {todos
              .filter(
                (todo) =>
                  new Date(todo.time).getDate() === new Date(currentDate.toISOString()).getDate()
              )
              .map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTask(item)
                    setModalVisible(true)
                  }}
                  key={index}
                  style={tw(
                    'h-30 w-[327px] bg-white mt-5 rounded-lg px-5 py-5 self-center shadow-lg border-t-4',
                    {
                      borderTopColor:
                        moment(new Date(item.time)).diff(moment().startOf('day'), 'days') === 0
                          ? 'red'
                          : moment(new Date(item.time)).diff(moment().startOf('day'), 'days') === 1
                          ? '#FFAC2F'
                          : 'green',
                    }
                  )}
                >
                  <View>
                    <View style={tw('flex flex-row justify-between')}>
                      <Text style={tw('font-nunito-bold uppercase text-xl')}>{item.title}</Text>
                      <View
                        style={tw('rounded-lg p-1', {
                          backgroundColor:
                            moment(new Date(item.time)).diff(moment().startOf('day'), 'days') === 0
                              ? 'red'
                              : moment(new Date(item.time)).diff(
                                  moment().startOf('day'),
                                  'days'
                                ) === 1
                              ? '#FFAC2F'
                              : 'green',
                        })}
                      >
                        <Text
                          style={tw('font-nunito-semibold uppercase text-sm text-white')}
                        >{`${moment(item.time).format('HH:MM')}`}</Text>
                      </View>
                    </View>
                    <View>
                      <View style={tw('mt-3')}>
                        <Text
                          style={{
                            color: '#BBBBBB',
                            fontSize: 14,
                          }}
                        >
                          {item.notes}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 80,
                      width: 5,
                      // backgroundColor: item.color,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}
