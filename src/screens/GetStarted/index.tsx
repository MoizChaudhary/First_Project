import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
import Btn from '../../components/btn';
import {fonts} from '../../assets/fonts';
const GetStarted = ({onPress}: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.MainViw}>
      <View style={styles.Img_View}>
        <Image
          resizeMode="contain"
          source={Images.GetStarted}
          style={styles.Img_style}
        />
      </View>
      <View>
        <Image source={Images.logo} style={styles.Logo_style} />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={styles.Title_style}>
          Listen and read{' '}
          <Text style={{color: '#5686F5', fontFamily: fonts.RobotoBold}}>
            {' '}
            1000's{' '}
          </Text>
          of islamic books
        </Text>
        <Text style={styles.Text_style}>
          Estibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere
        </Text>
      </View>
      <Btn
        title={'Get Started'}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />
      <Btn
        title={'Login'}
        customTextStyle={{color: '#5686F5', alignSelf: 'center'}}
        customViewStyle={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#5686F5',
          marginTop: 15,
        }}
        onPress={() => {
          navigation.navigate('LogIn');
        }}
      />
    </View>
  );
};
export default GetStarted;
