import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
import PasswordField from '../../components/PasswordField';
import Btn from '../../components/btn';
const NewPassword = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPasswrod] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [verified, setVerified] = useState(false);
  const Password = () => {
    setMessageError(false);
    setVerified(false);
    if (password === confirmPassword) {
      setVerified(true);
      Alert.alert('Password Changed Successfully..!');
      navigation.navigate('LogIn');
    } else {
      setMessageError(true);
    }
  };
  return (
    <View style={styles.MainView}>
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.GoBack} style={styles.Arrow_Style} />
      </TouchableOpacity>
      <View style={styles.Title_View}>
        <Text style={styles.Title_Text}>New Password</Text>
      </View>
      <View style={styles.Text_View}>
        <Text style={styles.Text_Style}>Enter password to reset</Text>
      </View>
      <ScrollView>
        <View>
          <PasswordField
            value={password}
            label={'New Password'}
            onChangeText={(text: any) => setPassword(text)}
          />
          <PasswordField
            value={password}
            label={'Confirm Password'}
            onChangeText={(text: any) => setPassword(text)}
          />
          <Btn
            title={'Reset password'}
            onPress={() => {
              navigation.navigate('LogIn');
            }}
          />
          {messageError ? (
            <View style={styles.MessageError_View}>
              <Image source={Images.Cross} style={styles.MessageError_Img} />
              <Text style={styles.errorText}>{'Incorrect Password'}</Text>
            </View>
          ) : null}
          {verified ? (
            <View style={styles.Verified_View}>
              <Image source={Images.Verified} style={styles.Verified_Img} />
              <Text style={styles.VerifiedText}>
                {'Password  Changed Successfully..!'}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};
export default NewPassword;
