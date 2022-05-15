import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { format } from 'date-fns'
import DatePicker from 'react-native-modern-datepicker'
import Popover from 'react-native-popover-view'

import { tw } from '@/lib/tailwind'
export const SalaryScreen = () => {
  const [date, setDate] = useState(format(new Date(), 'MM-yyyy'))
  const [show, setShow] = useState(false)
  const [showBasicInfo, setShowBasicInfo] = useState(false)
  const [showMonthlyInfo, setShowMonthlyInfo] = useState(false)
  const [totalDerived, setTotalDerived] = useState(false)
  const [derived, setDerived] = useState(false)
  const [anotherIncome, setAnotherIncome] = useState(false)
  const [totalDeduction, setTotalDeduction] = useState(false)
  const [showMandatory, setShowMandatory] = useState(false)
  const [showPIT, setShowPIT] = useState(false)

  const showPicker = useCallback((value) => setShow(value), [])
  const dateNow = new Date()
  const maxDayLastMonth = format(
    new Date(dateNow.getFullYear(), dateNow.getMonth(), 0),
    'yyyy-MM-dd'
  )
  return (
    <View style={tw('flex flex-1 bg-gray-200')}>
      <View style={tw('h-20 flex items-center justify-center')}>
        <TouchableOpacity
          onPress={() => showPicker(true)}
          style={tw(
            'items-center bg-white px-3 h-13 w-45 relative flex flex-row justify-center rounded-lg'
          )}
        >
          <Icon name="calendar" size={30} color="#FFBE55" />
          <View style={tw('flex-grow flex items-center')}>
            <Text>{date}</Text>
          </View>
          {/* <Icon reverse name="ios-american-football" type="ionicon" color="#517fa4" /> */}
        </TouchableOpacity>
      </View>
      {show && (
        <DatePicker
          mode="monthYear"
          options={{
            backgroundColor: '#090C08',
            textHeaderColor: '#FFA25B',
            textDefaultColor: '#F6E7C1',
            selectedTextColor: '#fff',
            mainColor: '#F4722B',
            textSecondaryColor: '#D6C7A1',
            borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
          onMonthYearChange={(selectedDate: string) => {
            const words = selectedDate.split(' ')
            setDate(words[1] + '-' + words[0])
            showPicker(false)
          }}
          selected={maxDayLastMonth}
          maximumDate={maxDayLastMonth}
          selectorStartingYear={2000}
          minuteInterval={30}
        />
      )}

      <View style={tw('items-center')}>
        <Text style={tw('font-nunito-bold text-yellow-600 text-lg')}>PAYROLL {date}</Text>
      </View>
      <ScrollView>
        <View style={tw('w-95 h-full mt-1 ml-4 mr-2 bg-white rounded-xl px-3')}>
          <TouchableOpacity
            onPress={() => {
              setShowBasicInfo(!showBasicInfo)
            }}
            style={tw(
              'items-center flex-row bg-yellow-500 h-13 w-90 mt-2 rounded-xl justify-between pr-2'
            )}
          >
            <Text style={tw('text-white font-nunito-bold text-base')}> Basic Salary Info</Text>
            {showBasicInfo && <Icon name="caret-up" size={30} color="#FFBE55" />}
            {!showBasicInfo && <Icon name="caret-down" size={30} color="#FFBE55" />}
          </TouchableOpacity>
          {showBasicInfo && (
            <>
              <View
                style={tw(
                  'items-center justify-between flex-row  border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> Basic Salary</Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (1) </Text>

                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>12 000 000</Text>
                </View>
              </View>
              <View
                style={tw(
                  'items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>
                  Bonus (Optional)
                </Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (2) </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>0</Text>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            onPress={() => {
              setShowMonthlyInfo(!showMonthlyInfo)
            }}
            style={tw(
              'items-center flex-row bg-yellow-500 h-13 w-90 mt-2 rounded-xl justify-between pr-2 '
            )}
          >
            <Text style={tw('text-white font-nunito-bold text-base')}> Monthly Info</Text>
            {showMonthlyInfo && <Icon name="caret-up" size={30} color="#FFBE55" />}
            {!showMonthlyInfo && <Icon name="caret-down" size={30} color="#FFBE55" />}
          </TouchableOpacity>
          {showMonthlyInfo && (
            <>
              <View
                style={tw(
                  'items-center justify-between flex-row  border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>
                  {' '}
                  Standard Working Days
                </Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (4) </Text>

                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>22</Text>
                </View>
              </View>
              <View
                style={tw(
                  'items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>
                  Actual Working Days
                </Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (5) </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>22</Text>
                </View>
              </View>
              <View
                style={tw(
                  'items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>Unpaid Leaves</Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (6) </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>0</Text>
                </View>
              </View>
              <View
                style={tw(
                  'items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>Paid Leaves </Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (7) </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>0</Text>
                </View>
              </View>
            </>
          )}
          <Popover
            isVisible={totalDerived}
            popoverStyle={tw('bg-yellow-400')}
            onRequestClose={() => setTotalDerived(false)}
            from={
              <TouchableOpacity
                onPress={() => setTotalDerived(true)}
                style={tw(
                  'items-center flex-row bg-yellow-700 h-13 w-90 mt-2 rounded-xl justify-between pr-2 pl-1 '
                )}
              >
                <Text style={tw('text-white font-nunito-bold text-base')}>
                  I. Total derived Income
                </Text>
                <Text style={tw('text-white font-nunito-bold text-base')}>14 000 000</Text>
              </TouchableOpacity>
            }
          >
            <Text style={tw('text-base')}>Calculated By (A) + (B)</Text>
          </Popover>
          <Popover
            isVisible={derived}
            popoverStyle={tw('bg-yellow-400')}
            onRequestClose={() => setDerived(false)}
            from={
              <TouchableOpacity
                onPress={() => setDerived(true)}
                style={tw(
                  'items-center flex-row bg-yellow-500 h-13 w-90 mt-2 rounded-xl justify-between pr-2 pl-1 '
                )}
              >
                <Text style={tw('text-white font-nunito-bold text-base')}>A. Derived Salary</Text>
                <Text style={tw('text-white font-nunito-bold text-base')}>12 000 000</Text>
              </TouchableOpacity>
            }
          >
            <Text style={tw('text-base')}>Calculated By ((1)+(2))/(4)*(5)</Text>
          </Popover>
          <TouchableOpacity
            onPress={() => {
              setAnotherIncome(!anotherIncome)
            }}
            style={tw(
              'items-center flex-row bg-yellow-500 h-13 w-90 mt-2 rounded-xl justify-between pr-2 pl-1'
            )}
          >
            <Text style={tw('text-white font-nunito-bold text-base')}>B. Another Income</Text>
            <View style={tw('flex-row justify-between w-25 items-center')}>
              <Text style={tw('text-white font-nunito-bold text-base')}>2 000 000</Text>
              {anotherIncome && <Icon name="caret-up" size={30} color="#FFBE55" />}
              {!anotherIncome && <Icon name="caret-down" size={30} color="#FFBE55" />}
            </View>
          </TouchableOpacity>
          {anotherIncome && (
            <>
              <View
                style={tw(
                  'items-center justify-between flex-row  border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>Lunch</Text>

                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>1 000 000</Text>
              </View>
              <View
                style={tw(
                  'items-center justify-between flex-row  border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>Parking</Text>

                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>1 000 000</Text>
              </View>
            </>
          )}
          <Popover
            isVisible={totalDeduction}
            popoverStyle={tw('bg-yellow-400')}
            onRequestClose={() => setTotalDeduction(false)}
            from={
              <TouchableOpacity
                onPress={() => setTotalDeduction(true)}
                style={tw(
                  'items-center flex-row bg-yellow-700 h-13 w-90 mt-2 rounded-xl justify-between pr-2 pl-1 '
                )}
              >
                <Text style={tw('text-white font-nunito-bold text-base')}>II. Total Deduction</Text>
                <Text style={tw('text-white font-nunito-bold text-base')}>1 750 000</Text>
              </TouchableOpacity>
            }
          >
            <Text style={tw('text-base')}>Calculated By (A) + (B)</Text>
          </Popover>
          <Popover
            isVisible={showMandatory}
            popoverStyle={tw('bg-yellow-400')}
            onRequestClose={() => setShowMandatory(false)}
            from={
              <TouchableOpacity
                onPress={() => setShowMandatory(true)}
                style={tw(
                  'items-center flex-row bg-yellow-500 h-13 w-90 mt-2 rounded-xl justify-between pr-2 pl-1 '
                )}
              >
                <Text style={tw('text-white font-nunito-bold text-base')}>
                  A. Mandatory Insurance
                </Text>
                <Text style={tw('text-white font-nunito-bold text-base')}>1 470 000</Text>
              </TouchableOpacity>
            }
          >
            <Text style={tw('text-base')}>Calculated by (I)*10.5/100</Text>
          </Popover>
          <TouchableOpacity
            onPress={() => {
              setShowPIT(!showPIT)
            }}
            style={tw(
              'items-center flex-row bg-yellow-500 h-13 w-90 mt-2 rounded-xl justify-between pr-2 pl-1'
            )}
          >
            <Text style={tw('text-white font-nunito-bold text-base')}>B. Personal Income Tax</Text>
            <View style={tw('flex-row justify-between w-25 items-center')}>
              <Text style={tw('text-white font-nunito-bold text-base')}>80 000</Text>
              {showPIT && <Icon name="caret-up" size={30} color="#FFBE55" />}
              {!showPIT && <Icon name="caret-down" size={30} color="#FFBE55" />}
            </View>
          </TouchableOpacity>
          {showPIT && (
            <>
              <View
                style={tw(
                  'items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>
                  Allowance not subjected to tax
                </Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (8) </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>730 000</Text>
                </View>
              </View>
              <View
                style={tw(
                  'items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>
                  Personal Relief
                </Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (9) </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>11 000 000</Text>
                </View>
              </View>
              <View
                style={tw(
                  'items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2 border-b'
                )}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>
                  Dependent Relief
                </Text>
                <View style={tw('flex-row justify-between w-40')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}> (10) </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>0</Text>
                </View>
              </View>
              <View
                style={tw('items-center justify-between flex-row border-yellow-600 h-15 w-90 mt-2')}
              >
                <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>Taxable Income</Text>
                <View style={tw('flex-row justify-between w-60')}>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>
                    (I)-(II.A)-(8)-(9)-(10)
                  </Text>
                  <Text style={tw('text-yellow-600 font-nunito-bold text-base')}>800,000</Text>
                </View>
              </View>
            </>
          )}
          <View
            style={tw(
              'border-t-2 w-full mt-4 border-yellow-800 items-center h-20 justify-end flex-row'
            )}
          >
            <Text style={tw('text-yellow-600 font-nunito-bold text-lg')}>
              Net Income: 12 450 000
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
