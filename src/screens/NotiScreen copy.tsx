import { ScrollView, View, Text, ImageBackground, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import EventCalendar from 'react-native-events-calendar'

import { tw } from '@/lib/tailwind'

export const NotiScreen = () => {
  const { width } = Dimensions.get('window')

  const [events, setEvents] = useState([
    {
      start: '2020-01-01 00:00:00',
      end: '2020-01-01 02:00:00',
      title: 'New Year Party',
      summary: 'xyz Location',
    },
    {
      start: '2020-01-01 01:00:00',
      end: '2020-01-01 02:00:00',
      title: 'New Year Wishes',
      summary: 'Call to every one',
    },
    {
      start: '2020-01-02 00:30:00',
      end: '2020-01-02 01:30:00',
      title: 'Parag Birthday Party',
      summary: 'Call him',
    },
    {
      start: '2020-01-03 01:30:00',
      end: '2020-01-03 02:20:00',
      title: 'My Birthday Party',
      summary: 'Lets Enjoy',
    },
    {
      start: '2020-02-04 04:10:00',
      end: '2020-02-04 04:40:00',
      title: 'Engg Expo 2020',
      summary: 'Expoo Vanue not confirm',
    },
  ])

  const eventClicked = ({ event }: { event: EventTarget }) => {
    //On Click of event showing alert from here
    alert(JSON.stringify(event))
  }

  return (
    <SafeAreaView style={tw('flex-1 items-center justify-center')}>
      <View style={tw('flex-1 items-center justify-center')}>
        <EventCalendar
          eventTapped={eventClicked}
          // Function on event press
          events={events}
          // Passing the Array of event
          width={width}
          // Container width
          size={15}
          // number of date will render before and after initDate
          // (default is 30 will render 30 day before initDate
          // and 29 day after initDate)
          initDate={new Date()}
          // Show initial date (default is today)
          scrollToFirst
          // Scroll to first event of the day (default true)
        />
      </View>
    </SafeAreaView>
  )
}
