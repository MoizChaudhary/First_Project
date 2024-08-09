import {View, Image, StatusBar} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images/index';
import {useEffect} from 'react';
import styles from './styles';
const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('OnBoarding1');
    }, 3000);
  }, []);
  return (
    <View style={styles.MainView}>
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      </View>
      <View style={{alignItems: 'center'}}>
        <View>
          <Image source={Images.logo} style={styles.background} />
        </View>
        <View style={styles.View_S1}>
          <Image source={Images.S1} style={styles.Img_S1} />
        </View>
      </View>
      <View style={styles.View_S2}>
        <Image source={Images.S2} style={styles.Img_S2} />
      </View>
      <View style={styles.View_S3}>
        <Image source={Images.S3} style={styles.Img_S3} />
      </View>
      <View style={styles.View_S4}>
        <Image source={Images.S4} style={styles.Img_S4} />
      </View>
    </View>
  );
};
export default SplashScreen;
