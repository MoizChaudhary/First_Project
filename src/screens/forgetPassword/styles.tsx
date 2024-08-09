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
  Title_View:{
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    marginTop: 100,
  },
  Title_Text:{fontWeight: 'bold', fontSize: 20, color: '#000000'},
  Text_View:{justifyContent: 'center', alignSelf: 'center'},
  Text_Style:{fontSize: 15, color: '#000000'},
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
    marginVertical: 35,
    padding: 15,
    borderRadius: 8,
    // marginVertical: 15,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
});

export default styles;
