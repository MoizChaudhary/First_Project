import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogIn = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '620361642218-29ocdmhlersvmga2qa23r6udi851oaia.apps.googleusercontent.com',
    });
  }, []);
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Get the user's ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      // Get the user object
      const user = userCredential.user;

      // Extract additional user information
      const userInfo = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      // Store the user information in AsyncStorage
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

      // Navigate to "For You" screen
      navigation.navigate('bottomNavigation');

      // Log success message
      console.log('Logged in successfully, User Info:', userInfo);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      // @ts-ignore
      setErrorMessage('Google Sign-In failed. Please try again.');
    }
  }

  const handleLogin = async () => {
    try {
      // Sign in the user with email and password
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      // Get the user object
      const user = userCredential.user;

      // Extract additional user information
      const userInfo = {
        uid: user.uid,
        displayName: user.displayName, // This might be null if not set by the user
        email: user.email, // This might be null if not set by the user
      };

      // Store the user information in AsyncStorage
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

      console.log('User Signed In and Info Stored!');

      // Navigate to "For You" screen
      navigation.navigate('bottomNavigation');
    } catch (error: any) {
      // Handle errors here
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error('Error signing in:', error);
        // Optional: Display user-friendly error message
        // setErrorMessage('Login failed. Please try again.');
      }
    }
  };

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
        <TouchableOpacity
          style={styles.Forget_Touch}
          onPress={() => {
            navigation.navigate('Forget Password');
          }}>
          <Text style={styles.Forget_Text}>Forget Password?</Text>
        </TouchableOpacity>
        {errorMessage && (
          <Text style={{color: 'red', marginBottom: 20}}>{errorMessage}</Text>
        )}

        <Btn title={'Sign In'} onPress={handleLogin} />

        <SocialIcons
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          onGoogle={() => {
            onGoogleButtonPress();
          }}
          text={'Dont have an Account?'}
          link={'Sign up'}
        />
      </ScrollView>
    </View>
  );
};

export default LogIn;
