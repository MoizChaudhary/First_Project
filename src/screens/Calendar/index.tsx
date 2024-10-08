import React, {useState, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  StatusBar,
} from 'react-native';
//@ts-ignore
import CalendarPicker from 'react-native-calendar-picker';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const Calendar = () => {
  const navigate = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarRef = useRef(null); // Step 1: Create a ref for CalendarPicker

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date: any, type: any) => {
    if (type === 'START_DATE') {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
  };

  // Step 3: Add the reset button handler
  const handleReset = () => {
    if (calendarRef.current) {
      //@ts-ignore
      calendarRef.current.resetSelections(); // Calling resetSelections via the ref
      setSelectedStartDate(null); // Clear the state for selectedStartDate
      setSelectedEndDate(null); // Clear the state for selectedEndDate
    }
  };
  // const handleOnPressNext = () => {
  //   console.log('clicked: ', handleOnPressNext);
  //   // Create a new date object without modifying the original
  //   let nextMonth = new Date(currentDate);
  //   nextMonth.setMonth(nextMonth.getMonth() + 1); // Increment the month
  //   setCurrentDate(nextMonth);
  // };

  // // Function to go to the previous month
  // const handleOnPressPrevious = () => {
  //   // Create a new date object without modifying the original
  //   let prevMonth = new Date(currentDate);
  //   prevMonth.setMonth(prevMonth.getMonth() - 1); // Decrement the month
  //   setCurrentDate(prevMonth);
  // };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#060A75" barStyle="light-content" />

      <View style={{backgroundColor: '#060A75', height: '50%'}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            justifyContent: 'space-between',
            marginHorizontal: 20,
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 25,
              backgroundColor: '#ffff',
              borderWidth: 1,
              padding: 8,
              alignSelf: 'center',
            }}
            onPress={() => {
              navigate.goBack();
            }}>
            <Image
              source={Images.GoBack}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                justifyContent: 'space-between',
              }}
            />
          </TouchableOpacity>
          <Text style={{color: '#ffff', fontSize: 24}}> Calendar</Text>
          <TouchableOpacity>
            <Image
              source={Images.share}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#ffff',
            height: '90%',
            borderRadius: 20,
            top: 60,
          }}>
          <View>
            {/* CalendarPicker component with ref */}
            <CalendarPicker
              ref={calendarRef} // Step 2: Attach the ref to CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date(2020, 1, 1)}
              maxDate={new Date(2050, 6, 3)}
              todayBackgroundColor="gray"
              selectedDayStyle={{backgroundColor: 'green'}}
              selectedDayColor="green"
              selectedDayTextColor="#ffffff"
              onDateChange={onDateChange}
              scrollable={true}
              scrollDecelerationRate="normal"
              dayShape="circle"
              width={400}
              height={400}
              disableMonthChange={true}
              restrictMonthNavigation={true}
              previousComponent={
                <TouchableOpacity
                  // onPress={handleOnPressPrevious}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/left.png')}
                    style={{
                      width: 34,
                      height: 34,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              }
              nextComponent={
                <TouchableOpacity
                  // onPress={handleOnPressNext}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/right.png')}
                    style={{width: 34, height: 34, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          {/* Display selected dates */}
          <View style={styles.dateContainer}>
            <Text style={styles.text}>
              Selected Start Date:{' '}
              {
                //@ts-ignore
                selectedStartDate ? selectedStartDate.toString() : ''
              }
            </Text>
            <Text style={styles.text}>
              Selected End Date:{' '}
              {
                //@ts-ignore
                selectedEndDate ? selectedEndDate.toString() : ''
              }
            </Text>
            <TouchableOpacity
              onPress={handleReset}
              style={{
                position: 'absolute',
                width: '35%',
                // bottom: 25,
                top: 180,
                backgroundColor: '#FFFF',
                marginHorizontal: 25,
                padding: 15,
                borderRadius: 8,
              }}>
              <Text style={{color: '#000000', alignSelf: 'center'}}>
                Reset Calendar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        // onPress={handleReset}
        style={{
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          bottom: 25,
          backgroundColor: '#FFFF',
          marginHorizontal: 25,
          padding: 15,
          borderRadius: 8,
        }}>
        <Text style={{color: '#000000', alignSelf: 'center'}}>
          Agree & Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 20,
    backgroundColor: '#060A75',
    height: '110%',
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    color: '#FFFF',
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default Calendar;
