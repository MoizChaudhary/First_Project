import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from "@react-native-firebase/database";
// import database from 'react-native-firebase/database';
const LogIn = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  // const handleLogin = async () => {
  //   try {
  //     const isUserCreated = await auth().createUserWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     console.log(isUserCreated);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <View style={styles.MainView}>
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      </View>
      <View style={styles.Title_View}>
        <Text style={styles.Title_Text}>Sign In</Text>
      </View>
      <View style={styles.Text_View}>
        <Text style={styles.Text_style}>Sign in to your account</Text>
      </View>
      <ScrollView>
        <View>
          <TextInput
            mode="outlined"
            style={styles.emailD}
            label="Email address"
            value={email}
            theme={{
              colors: {primary: '#1e90ff', secondary: 'red'},
            }}
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
            theme={{
              colors: {primary: '#1e90ff'},
            }}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.Forget_Touch}
          onPress={() => {
            navigation.navigate('Forget Password');
          }}>
          <Text style={styles.Forget_Text}>Forget Password?</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => onPress}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Line_View}>
          <View style={styles.Img_View}>
            <Image source={Images.line} style={styles.Img_Style} />
          </View>
          <View>
            <Text style={styles.Line_Text}>Or Sign In with</Text>
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
            <Text style={{color: '#000000'}}>Don't have an Account?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.SignUp_Text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LogIn;
