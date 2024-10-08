import React, {useState} from 'react';
import {
  Button,
  Text,
  View,
  Alert,
  StatusBar,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const DeleteAccountScreen = () => {
  const [password, setPassword] = useState(''); // State for the password
  const navigation = useNavigation();

  const reauthenticateAndDelete = async () => {
    const user = auth().currentUser;

    if (user && password) {
      try {
        // Step 1: Reauthenticate the user
        const credential = auth.EmailAuthProvider.credential(
          //@ts-ignore
          user.email,
          password, // Use entered password
        );
        await user.reauthenticateWithCredential(credential);

        // Step 2: Delete user data from Firestore first
        const userDocRef = firestore().collection('users').doc(user.uid);
        await userDocRef.delete(); // Delete the user's document from Firestore

        // Step 3: Delete the user account from Firebase Authentication
        await user.delete();

        Alert.alert(
          'Account Deleted',
          'Your account and data have been successfully deleted.',
        );
        //@ts-ignore
        navigation.navigate('LogIn'); // Redirect to a home screen or login screen after deletion
      } catch (error) {
        //@ts-ignore
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert(
        'Error',
        'Please enter your password to delete your account.',
      );
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#060A75" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}>
          <Image source={Images.GoBack} style={styles.goBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Delete Account</Text>
        <TouchableOpacity>
          <Image source={Images.share} style={styles.shareIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.warningText}>
          Are you sure you want to delete your account permanently?
        </Text>

        {/* Password Input Field */}
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.applePayButton}
          onPress={reauthenticateAndDelete}>
          <Text style={styles.applePayText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#060A75',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 10,
  },
  goBackButton: {
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 8,
    alignSelf: 'center',
  },
  goBackIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  shareIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  warningText: {
    color: 'white',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  applePayButton: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#000',
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  applePayText: {
    color: '#fff',
    alignSelf: 'center',
  },
});

export default DeleteAccountScreen;
