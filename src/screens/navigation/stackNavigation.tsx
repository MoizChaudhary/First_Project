import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoute} from '../navigation/navigationRoute';
import React from 'react';
import SplashScreen from '../splash/index';
import OnBoarding1 from '../OnBoarding1/index';
import OnBoarding2 from '../OnBoarding2/index';
import OnBoarding3 from '../OnBoarding3/index';
import OnBoarding4 from '../OnBoarding4/index';
import GetStarted from '../GetStarted/index';
import SignUp from '../SignUp/index';
import LogIn from '../LogIn/index';
import ForgetPassword from '../forgetPassword/index';
import Otp from '../Otp/index';
import NewPassword from '../NewPassword';
import Gender from '../Gender';
import Age from '../Age';
import Goals from '../Goals';
import Prefer1 from '../Prefer1';
import Prefer2 from '../Prefer2';
import ForYou from '../ForYou';
import Explore from '../Explore';
import Create from '../Create';
import Library from '../Library';
import Profile from '../Profile';
import bottomNavigation from '../../bottomNavigation/bottomNavigation';
import Subscription from '../Subscription';
import DarkMode from '../DarkMode';
import {ThemeProvider} from '../../ContextAPI/ThemeContext';
import SubscriptionForm from '../SubscriptionForm';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={NavigationRoute.SplashScreen}
            component={SplashScreen}
          />
          <Stack.Screen
            name={NavigationRoute.OnBoarding1}
            component={OnBoarding1}
          />
          <Stack.Screen
            name={NavigationRoute.OnBoarding2}
            component={OnBoarding2}
          />
          <Stack.Screen
            name={NavigationRoute.OnBoarding3}
            component={OnBoarding3}
          />
          <Stack.Screen
            name={NavigationRoute.OnBoarding4}
            component={OnBoarding4}
          />
          <Stack.Screen
            name={NavigationRoute.GetStarted}
            component={GetStarted}
          />
          <Stack.Screen name={NavigationRoute.SignUp} component={SignUp} />
          <Stack.Screen name={NavigationRoute.LogIn} component={LogIn} />
          <Stack.Screen
            name={NavigationRoute.ForgetPassword}
            component={ForgetPassword}
          />
          <Stack.Screen name={NavigationRoute.Otp} component={Otp} />
          <Stack.Screen
            name={NavigationRoute.NewPassword}
            component={NewPassword}
          />
          <Stack.Screen name={NavigationRoute.Gender} component={Gender} />
          <Stack.Screen name={NavigationRoute.Age} component={Age} />
          <Stack.Screen name={NavigationRoute.Goals} component={Goals} />
          <Stack.Screen name={NavigationRoute.Prefer1} component={Prefer1} />
          <Stack.Screen name={NavigationRoute.Prefer2} component={Prefer2} />
          <Stack.Screen name={NavigationRoute.ForYou} component={ForYou} />
          <Stack.Screen name={NavigationRoute.Explore} component={Explore} />
          <Stack.Screen name={NavigationRoute.Create} component={Create} />
          <Stack.Screen name={NavigationRoute.Library} component={Library} />
          <Stack.Screen name={NavigationRoute.Profile} component={Profile} />
          <Stack.Screen name={NavigationRoute.DarkMode} component={DarkMode} />

          <Stack.Screen
            name={NavigationRoute.Subscription}
            component={Subscription}
          />
          <Stack.Screen
            name={NavigationRoute.SubscriptionForm}
            component={SubscriptionForm}
          />
          <Stack.Screen
            name={NavigationRoute.bottomNavigation}
            component={bottomNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Navigator;
