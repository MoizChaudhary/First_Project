import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '620361642218-29ocdmhlersvmga2qa23r6udi851oaia.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      setLoading(true); // Set loading to true
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;
      const userInfo = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigation.navigate('bottomNavigation');
      console.log('Logged in successfully, User Info:', userInfo);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      //@ts-ignore
      setErrorMessage('Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  }

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      const userInfo = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      };
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('User Signed In and Info Stored!');
      navigation.navigate('bottomNavigation');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error('Error signing in:', error);
        //@ts-ignore
        setErrorMessage('Login failed. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false
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
          onChangeText={(text: any) => setEmail(text)}
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
          onPress={() => navigation.navigate('Forget Password')}>
          <Text style={styles.Forget_Text}>Forget Password?</Text>
        </TouchableOpacity>
        {errorMessage && (
          <Text style={{color: 'red', marginBottom: 20}}>{errorMessage}</Text>
        )}
        <Btn title={'Sign In'} onPress={handleLogin} />
        <SocialIcons
          onPress={() => navigation.navigate('SignUp')}
          onGoogle={() => onGoogleButtonPress()}
          text={'Dont have an Account?'}
          link={'Sign up'}
        />
      </ScrollView>

      {/* Show ActivityIndicator when loading */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0066ff" />
        </View>
      )}
    </View>
  );
};

export default LogIn;
