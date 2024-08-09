import React from 'react';
import SplashScreen from '../Codistan_project/src/screens/splash';
import OnBoarding1 from '../Codistan_project/src/screens/OnBoarding1';
import OnBoarding2 from '../Codistan_project/src/screens/OnBoarding2';
import OnBoarding3 from '../Codistan_project/src/screens/OnBoarding3';
import OnBoarding4 from '../Codistan_project/src/screens/OnBoarding4';
import Navigator from './src/screens/navigation/stackNavigation';
import { SafeAreaView, View } from 'react-native';

const App = () => {
  return (
    <>
     
        <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <Navigator/>
        </SafeAreaView>
      
    </>
  )
}
export default App;
