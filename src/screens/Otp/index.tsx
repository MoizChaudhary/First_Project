import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import {OtpInput} from 'react-native-otp-entry';
import * as Yup from 'yup';
import styles from './styles';
const Otp = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const otpSchema = Yup.number().required('OTP is required');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [verified, setVerified] = useState(false);
  const otpInputRef = useRef<any>(null);
  const verifyOtp = () => {
    otpSchema
      .validate(otp)
      .then(() => {
        console.log(otp);
        if (otp === '111111') {
          setVerified(true);
          navigation.navigate('NewPassword');
        } else {
          setMessageError(true);
        }

        setError('');
      })
      .catch(validationError => {
        setError(validationError.message);
      });
  };
  const resetOtp = () => {
    if (otpInputRef.current) {
      otpInputRef.current.clear();
      setOtp('');
      setError('');
      setMessageError(false);
      setVerified(false);
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
        <Text style={styles.Title_Text}>Enter Code</Text>
      </View>
      <View style={styles.Text_View}>
        <Text style={styles.Text_Style}>
          We have sent a Verification Code to your email, please enter the code
          below
        </Text>
      </View>
      <ScrollView>
        <View style={styles.Otp_View}>
          <OtpInput
            ref={otpInputRef}
            numberOfDigits={6}
            focusColor="#3598FF"
            onTextChange={text => {
              setOtp(text);
              console.log('text', text);
              setMessageError(false);
              setVerified(false);
            }}
            // @ts-ignore
            containerStyle={styles.container}
            value={otp}
            inputsContainerStyle={styles.inputsContainer}
            pinCodeContainerStyle={styles.pinCodeContainer}
            pinCodeTextStyle={styles.pinCodeText}
            focusStickStyle={styles.focusStick}
            focusStickBlinkingDuration={500}
          />
        </View>
        <View style={styles.Code_View}>
          <View>
            <Text style={{color: '#000000'}}>Didn't Received code?</Text>
          </View>

          <TouchableOpacity onPress={resetOtp}>
            <Text style={styles.Send_Text}>send again</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={verifyOtp} style={styles.button}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
        {messageError ? (
          <View style={styles.Incorrect_View}>
            <Image source={Images.Cross} style={styles.Incorrect_Img} />
            <Text style={styles.errorText}>{'Incorrect OTP'}</Text>
          </View>
        ) : null}
        {verified ? (
          <View style={styles.Verfiy_View}>
            <Image source={Images.Verified} style={styles.Verify_Img} />
            <Text style={styles.VerifiedText}>{'Verified OTP'}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};
export default Otp;
