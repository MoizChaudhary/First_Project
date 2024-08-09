import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    MainView: {flex: 1, justifyContent: 'flex-end', backgroundColor: 'white'},
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 8,
    marginVertical: 15,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
  Img_OnBoarding1: {
    width: '80%',
    height: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  Main_Number_View: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  Touchable_style: {marginHorizontal: 5},
  Text1_style: {color: 'white', padding: 2, fontSize: 12},
  Text2_style: {color: '#000000', padding: 2, fontSize: 12},
  Text3_style: {color: '#000000', padding: 2, fontSize: 12},
  Text4_style: {color: '#000000', padding: 2, fontSize: 12},
  Digit_style: {
    backgroundColor: '#D7D7D7',
    borderRadius: 15,
    marginHorizontal: 2,
  },
  Digit1_Style: {
    backgroundColor: '#5686F5',
    borderRadius: 15,
    marginHorizontal: 2,
  },
  Title_Style: {
    fontSize: 20,
    marginHorizontal: 25,
    marginVertical: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  Text_Style: {marginHorizontal: 25, marginVertical: 20, fontSize: 12},
})

export default styles

