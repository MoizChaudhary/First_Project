import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const SignUp = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
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
        <View>
          <TextInput
            mode="outlined"
            style={styles.emailD}
            label="Full Name"
            value={fullName}
            theme={{
              colors: {primary: '#1e90ff', secondary: 'red'},
            }}
            onChangeText={text => setFullName(text)}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            style={styles.emailD}
            value={email}
            label="Email address"
            theme={{colors: {primary: '#1e90ff', secondary: 'red'}}}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            style={styles.passwordD}
            secureTextEntry={true}
            value={password}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-slash'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            label="Password"
            theme={{colors: {primary: '#1e90ff'}}}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            style={styles.passwordD}
            secureTextEntry={true}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-slash'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            label="Confirm Password"
            theme={{colors: {primary: '#1e90ff'}}}
            onChangeText={text => setPassword(text)}
          />
        </View>
        {errorMessage && (
          <Text style={{color: 'red', marginBottom: 20}}>{errorMessage}</Text>
        )}
        <View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Line_View}>
          <View style={styles.Img_View}>
            <Image source={Images.line} style={styles.Img_Style} />
          </View>
          <View>
            <Text style={styles.Text_Style}>Or Sign In with</Text>
          </View>
          <View style={styles.Img_View}>
            <Image source={Images.line} style={styles.Img_Style} />
          </View>
        </View>
        <View style={styles.Icon_View}>
          <View>
            <Image source={Images.Google} style={styles.Icon_Style} />
          </View>
          <View>
            <Image source={Images.Facebook} style={styles.Icon_Style} />
          </View>
          <View>
            <Image source={Images.Apple} style={styles.Icon_Style} />
          </View>
        </View>
        <View style={styles.Account_View}>
          <View>
            <Text style={{color: '#000000'}}>Have an Account?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LogIn');
            }}>
            <Text style={styles.SignIn_btn}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;
