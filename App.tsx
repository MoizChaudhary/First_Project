import React from 'react';
import Navigator from './src/screens/navigation/stackNavigation';
import { SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  
  
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <Navigator />
    </SafeAreaView>
  );
};

export default App;
