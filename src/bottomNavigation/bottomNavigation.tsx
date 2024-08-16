import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {ForYou} from '../screens';
import {Explore} from '../screens';
import {Create} from '../screens';
import {Library} from '../screens';
import {Profile} from '../screens';
import Svg, {SvgXml, Use} from 'react-native-svg';
import {ForYouSelected, ForYouUnSelected} from '../assets/svg/ForYou';
import {ExploreSelected, ExploreUnSelected} from '../assets/svg/Explore';
import {CreateSelected, CreateUnSelected} from '../assets/svg/Create';
import {LibrarySelected, LibraryUnSelected} from '../assets/svg/Library';
import {ProfileSelected, ProfileUnSelected} from '../assets/svg/Profile';

const Bottom = createBottomTabNavigator();
const App = () => {
  const [focus, setFocus] = useState('');
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}>
      <Bottom.Screen
        name="ForYou"
        component={ForYou}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <SvgXml xml={ForYouSelected} style={{width: 20, height: 20}} />
              </View>
            ) : (
              <SvgXml xml={ForYouUnSelected} style={{width: 20, height: 20}} />
            ),
        }}
      />
      <Bottom.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <SvgXml xml={ExploreSelected} style={{width: 20, height: 20}} />
              </View>
            ) : (
              <SvgXml xml={ExploreUnSelected} style={{width: 20, height: 20}} />
            ),
        }}
      />

      <Bottom.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <SvgXml xml={CreateSelected} style={{width: 20, height: 20}} />
              </View>
            ) : (
              <SvgXml xml={CreateUnSelected} style={{width: 20, height: 20}} />
            ),
        }}
      />

<Bottom.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <SvgXml xml={LibrarySelected} style={{width: 20, height: 20}} />
              </View>
            ) : (
              <SvgXml xml={LibraryUnSelected} style={{width: 20, height: 20}} />
            ),
        }}
      />

      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <SvgXml xml={ProfileSelected} style={{width: 20, height: 20}} />
              </View>
            ) : (
              <SvgXml xml={ProfileUnSelected} style={{width: 20, height: 20}} />
            ),
        }}
      />
    </Bottom.Navigator>
  );
};
export default App;
