import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import InputField from '../../components/TextInput';
import PasswordField from '../../components/PasswordField';
import Btn from '../../components/btn';
import SocialIcons from '../../components/GFBA';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [emails, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        emails,
        password,
      );

      // Get the user object from the response
      const user = userCredential.user;
      const uid = user.uid;
      const email = user.email;
      const isEmailVerified = user.emailVerified;
      const userName = fullName;
      await firestore().collection('Users').doc(uid).set({
        email,
        uid,
        isEmailVerified,
        userName,
      });
      // Navigate to the next screen
      navigation.navigate('Gender');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        setErrorMessage('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setErrorMessage('That email address is invalid!');
      } else {
        console.error(error);
        setErrorMessage('Something went wrong, please try again.');
      }
    }
  };

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
      await auth().signInWithCredential(googleCredential);

      // Navigate to "For You" screen
      navigation.navigate('Gender');

      // Log success message
      console.log('Logged in successfully');
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);

      if (error.code === 'auth/account-exists-with-different-credential') {
        console.log(
          'An account already exists with the same email address but different sign-in credentials. Please use a different account.',
        );
        setErrorMessage(
          'An account already exists with the same email address but different sign-in credentials. Please use a different account.',
        );
      } else {
        setErrorMessage('Google Sign-In failed. Please try again.');
      }
    }
  }

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
          onChangeText={(text: string) => {
            setFullName(text);
          }}
          label={'Full Name'}
          value={fullName}
        />
        <InputField
          onChangeText={(text: string) => {
            setEmail(text);
          }}
          label={'Email address'}
          value={emails}
        />
        <PasswordField
          value={password}
          label={'Password'}
          onChangeText={(text: string) => setPassword(text)}
        />
        <PasswordField
          value={confirmPassword}
          label={'Confirm Password'}
          onChangeText={(text: string) => setConfrimPassword(text)}
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
          onGoogle={onGoogleButtonPress}
          text={'Have an Account?'}
          link={'Sign in'}
        />
      </ScrollView>
    </View>
  );
};

export default SignUp;
