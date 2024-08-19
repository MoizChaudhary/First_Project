import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import InputField from '../../components/TextInput';
import PasswordField from '../../components/PasswordField';
import Btn from '../../components/btn';
import SocialIcons from '../../components/GFBA';

const SignUp = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const handleLogin = async () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created');
        navigation.navigate('Gender');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(setErrorMessage);
      });
  };
  return (
    <View style={styles.MainView}>
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      </View>
      <View style={styles.Title_View}>
        <Text style={styles.Title_Text}>Sign Up</Text>
      </View>
      <View style={styles.Text_View}>
        <Text style={styles.Text_style}>Sign in to your account</Text>
      </View>
      <ScrollView>
        <InputField
          onChangeText={(text: any) => {
            setFullName(text);
          }}
          label={'Full Name'}
          value={fullName}
        />
        <InputField
          onChangeText={(text: any) => {
            setEmail(text);
          }}
          label={'Email address'}
          value={email}
        />
        <PasswordField
          value={password}
          label={'Password'}
          onChangeText={(text: any) => setPassword(text)}
        />
        <PasswordField
          value={password}
          label={'Confirm Password'}
          onChangeText={(text: any) => setPassword(text)}
        />
        {errorMessage && (
          <Text style={{color: 'red', marginBottom: 20}}>{errorMessage}</Text>
        )}

        <View style={{marginVertical: 10}}></View>
        <Btn title={'Sign Up'} onPress={handleLogin} />

        <SocialIcons
          onPress={() => {
            navigation.navigate('LogIn');
          }}
          text={'Have an Account?'}
          link={'Sign in'}
        />

        <SocialIcons />
      </ScrollView>
    </View>
  );
};
export default SignUp;
