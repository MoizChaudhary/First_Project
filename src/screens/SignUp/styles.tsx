import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  MainView: {flex: 1, backgroundColor: 'white'},
  Title_View: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 15,
    marginTop: 30,
  },
  Title_Text: {fontWeight: 'bold', fontSize: 20, color: '#000000'},
  Text_View: {justifyContent: 'center', alignSelf: 'center'},
  Text_style: {fontSize: 15, color: '#000000'},
  emailD: {
    marginTop: 20,
    marginHorizontal: 30,

    fontSize: 14,
  },
  passwordD: {
    marginTop: 20,
    marginHorizontal: 30,

    fontSize: 14,
  },
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginVertical: 30,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
  Icon_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  Icon_Style: {width: 48, height: 48, marginHorizontal: 5},
  Account_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  SignIn_btn: {
    color: '#5686F5',
    fontWeight: '700',
    marginHorizontal: 5,
  },
  Line_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  Img_View: {marginHorizontal: 20},
  Text_Style: {fontSize: 15, fontWeight: '400', color: '#969696'},
  Img_Style:{marginTop: 8},
});
export default styles;
