import {View, Text, Image, StatusBar} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
import Btn from '../../components/btn';
const OnBoarding4 = ({onPress}: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.MainView}>
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Image source={Images.OnBoarding3} style={styles.Img_OnBoarding1} />
      </View>
      <View style={styles.Main_Number_View}>
        <View style={styles.Digit_style}>
          <TouchableOpacity style={styles.Touchable_style}>
            <Text style={styles.Text1_style}>1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Digit_style}>
          <TouchableOpacity style={styles.Touchable_style}>
            <Text style={styles.Text2_style}>2</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Digit_style}>
          <TouchableOpacity style={styles.Touchable_style}>
            <Text style={styles.Text3_style}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Digit1_Style}>
          <TouchableOpacity style={styles.Touchable_style}>
            <Text style={styles.Text4_style}>4</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={styles.Title_Style}>Retain what you learn</Text>
        <Text style={styles.Text_Style}>
          estibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere
        </Text>
      </View>
      <Btn
        title={'Next'}
        onPress={() => {
          navigation.navigate('GetStarted');
        }}
      />
    </View>
  );
};
export default OnBoarding4;
