import {View, Image, StatusBar, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '../../assets/images/index';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(async () => {
      const data = await AsyncStorage.getItem('userInfo');

      if (data === null || data === undefined || data === '') {
        navigation.replace('OnBoarding1');
      } else {
        navigation.replace('bottomNavigation');
      }
    }, 5000);
  }, []);

  return (
    <View style={styles.MainView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.circleContainer}>
        {/* <Image source={Images.S4} style={styles.Img_S4} />
        <Image source={Images.S3} style={styles.Img_S3} />
        <Image source={Images.S2} style={styles.Img_S2} />
        <Image source={Images.S1} style={styles.Img_S1} />
        <Image source={Images.logo} style={styles.background} /> */}
        <Image
          source={require('../../assets/animation/splash.gif')} // Path to your GIF
          style={{
            width: 400,
            height: 400, // Adjust size based on the GIF dimensions
            marginBottom: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image source={Images.logo} style={styles.background} />

        <Text
          style={{
            fontSize: 30,
            fontWeight: '900',
            color: '#000000',
            textAlign: 'center',
            marginHorizontal: 10,
          }}>
          Audio App
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
