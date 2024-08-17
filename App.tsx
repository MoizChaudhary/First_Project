import React, {useEffect} from 'react';
import Navigator from './src/screens/navigation/stackNavigation';
import firestore from '@react-native-firebase/firestore';

import {SafeAreaView} from 'react-native';

const App = () => {
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
