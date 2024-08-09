import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  MainView: {flex: 1, backgroundColor: 'white'},

  Line_Main_View: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 185,
  },
  Digit_View: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: 20,
  },
  Digit_Text: {color: '#ffff', fontSize: 12, textAlign: 'center'},
  Line_View: {flexDirection: 'row', marginHorizontal: 5},
  Line1_View: {width: 44, borderWidth: 2, borderRadius: 15},
  Line2_View: {width: 164, borderWidth: 2, borderColor: '#EFEFEF'},
  About_View: {alignItems: 'center', justifyContent: 'center'},
  Title_View: {alignSelf: 'center', marginVertical: 20},
  Title_Text: {color: '#191C20', fontSize: 24, fontWeight: '700'},
  Button_View: {flex: 1, justifyContent: 'flex-end'},
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
  item: {
    justifyContent: 'flex-end',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 25,
    borderRadius: 10,
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  selectedItem: {
    borderColor: '#0166FF',
    backgroundColor: '#E3EEFF',
  },
  title: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  },
});
export default styles;
