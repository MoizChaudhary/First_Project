import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Material Icons

const SignUpScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Confirm Password is required'),
    phoneNumber: Yup.string().matches(
      /^[0-9]{10,12}$/,
      'Phone number is not valid',
    ),
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.signInLink}>
          Already have an account? <Text style={styles.signIn}>Sign in!</Text>
        </Text>

        <Button icon="google" mode="contained" style={styles.googleButton}>
          Continue with Google
        </Button>

        <Text style={styles.orText}>or</Text>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                label="First Name"
                mode="outlined"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                error={touched.firstName && errors.firstName ? true : false}
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="account-outline"
                        size={20}
                        color={'black'}
                      />
                    )}
                  />
                } // Left Icon
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

              <TextInput
                label="Last Name"
                mode="outlined"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                error={touched.lastName && errors.lastName ? true : false}
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="account-outline"
                        size={20}
                        color={'black'}
                      />
                    )}
                  />
                } // Left Icon
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}

              <TextInput
                label="Email"
                mode="outlined"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email ? true : false}
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="email-outline"
                        size={20}
                        color={'black'}
                      />
                    )}
                  />
                } // Left Icon
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                label="Password"
                mode="outlined"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password ? true : false}
                secureTextEntry={!passwordVisible}
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="lock-outline"
                        size={20}
                        color={'black'}
                      />
                    )}
                  />
                } // Left Icon
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name={passwordVisible ? 'eye' : 'eye-off'}
                        size={20}
                        color={'black'}
                      />
                    )}
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                }
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                label="Confirm Password"
                mode="outlined"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? true
                    : false
                }
                secureTextEntry={!passwordVisible}
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="lock-outline"
                        size={20}
                        color={'black'}
                      />
                    )}
                  />
                } // Left Icon
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name={passwordVisible ? 'eye' : 'eye-off'}
                        size={20}
                        color={'black'}
                      />
                    )}
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                }
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TextInput
                label="Phone Number"
                mode="outlined"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber ? true : false}
                keyboardType="phone-pad"
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="phone-outline"
                        size={20}
                        color={'black'}
                      />
                    )}
                  />
                } // Left Icon
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.signUpButton}>
                Sign Up
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  signInLink: {
    alignSelf: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  signIn: {
    color: '#e67e22',
    fontWeight: 'bold',
  },
  googleButton: {
    marginBottom: 15,
    backgroundColor: '#db4437',
  },
  orText: {
    alignSelf: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  formContainer: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 12,
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: '#e67e22',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },
});

export default SignUpScreen;
