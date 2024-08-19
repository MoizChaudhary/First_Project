import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
import Btn from '../../components/btn';
const ForgetPassword = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  return (
    <View style={styles.MainView}>
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.GoBack} style={styles.Arrow_Style} />
      </TouchableOpacity>
      <View style={styles.Title_View}>
        <Text style={styles.Title_Text}>Forget Password</Text>
      </View>
      <View style={styles.Text_View}>
        <Text style={styles.Text_Style}>Enter your email</Text>
      </View>
      <ScrollView>
        <View>
          <TextInput
            mode="outlined"
            style={styles.emailD}
            label="Email address"
            theme={{colors: {primary: '#1e90ff', secondary: 'red'}}}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <Btn
          title={'Verify'}
          onPress={() => {
            navigation.navigate('Otp');
          }}
        />

        {/* <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Otp');
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;
