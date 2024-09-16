import React, {useEffect} from 'react';
import Navigator from './src/screens/navigation/stackNavigation';
import firestore from '@react-native-firebase/firestore';
import BottomSheetModalProvide from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const App = () => {
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('5b4f4ea9-c01f-4ebf-94a6-444950556d36');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDoc = await firestore()
          .collection('user')
          .doc('RfV1DvqE9VqCkPcZHayo')
          .get();
        console.log('Document data:', userDoc.data());
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Navigator />
    </SafeAreaView>
  );
};

export default App;
