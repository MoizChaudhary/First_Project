import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
  item: {
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 25,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  selectedItem: {
    borderColor: '#0166FF',
    backgroundColor: '#E3EEFF',
  },
  title: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  FlatList_Img: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  MainView: {flex: 1, backgroundColor: 'white'},
  Title_View: {alignSelf: 'center', marginVertical: 20},
  Title_Text: {color: '#191C20', fontSize: 24, fontWeight: '700'},
  Text_Style: {textAlign: 'center', marginVertical: 10},
  Btn_View: {justifyContent: 'flex-end'},
  Line_Main_View: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 0,
  },
  Digit_View: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: 20,
    marginHorizontal: 5,
  },
  Digit_Text: {color: '#ffff', fontSize: 12, textAlign: 'center'},
  Line1_View: {width: 155, borderWidth: 2, borderRadius: 20},
  Main_Line2_View: {flexDirection: 'row', marginHorizontal: 5},
  Line2_View: {width: 44, borderWidth: 2, borderRadius: 20},
  Line3_View: {width: 98, borderWidth: 2, borderColor: '#E1E1E1'},
});

export default styles;
