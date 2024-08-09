import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
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
          Listen and read <Text style={{color: '#5686F5'}}> 1000's </Text>of
          islamic books
        </Text>
        <Text style={styles.Text_style}>
          Estibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>GetStarted</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogIn');
          }}
          style={styles.LogIN_btn}>
          <Text style={styles.LogIn_Text}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default GetStarted;
