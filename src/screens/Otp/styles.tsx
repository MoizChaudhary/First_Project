import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  MainView: {flex: 1, backgroundColor: 'white'},
  Arrow_Style: {
    width: 8.5,
    height: 15,
    resizeMode: 'contain',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  Title_View: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    marginTop: 100,
  },
  Title_Text: {fontWeight: 'bold', fontSize: 20, color: '#000000'},
  Text_View: {justifyContent: 'center', alignSelf: 'center'},
  Text_Style: {
    fontSize: 14,
    color: '#747988',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 25,
  },
  Otp_View: {marginHorizontal: 30, marginVertical: 10},
  Code_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  Send_Text: {
    color: '#5686F5',
    fontWeight: '700',
    marginHorizontal: 5,
  },
  Incorrect_View: {
    flexDirection: 'row',
    backgroundColor: '#FEE8E8',
    marginHorizontal: 30,
    height: 40,
    borderRadius: 5,
    marginVertical: 15,
  },
  Incorrect_Img: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  Verfiy_View: {
    flexDirection: 'row',
    backgroundColor: '#E7FBF2',
    marginHorizontal: 30,
    height: 40,
    borderRadius: 5,
    marginVertical: 15,
  },
  Verify_Img: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  emailD: {
    marginTop: 30,
    marginHorizontal: 30,

    fontSize: 14,
  },
  passwordD: {
    marginTop: 30,
    marginHorizontal: 30,

    fontSize: 14,
  },
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginVertical: 25,
    padding: 15,
    borderRadius: 8,
    // marginVertical: 15,
  },
  focusStick: {},
  pinCodeText: {},
  pinCodeContainer: {},
  inputsContainer: {},
  container: {},
  errorText: {
    color: 'red',
    textAlign: 'center',
    alignSelf: 'center',
  },
  VerifiedText: {
    color: '#18932B',
    textAlign: 'center',
    alignSelf: 'center',
  },

  buttonText: {color: 'white', alignSelf: 'center'},
});

export default styles;
