// import {View, Text, StyleSheet} from 'react-native';
// import React, {useState} from 'react';
// import ToggleSwitch from 'toggle-switch-react-native';

// export default function DarkMode() {
//   const [theme, setTheme] = useState('light'); // Default to light mode

//   const handleToggle = (isOn: any) => {
//     setTheme(isOn ? 'dark' : 'light'); // Toggle between dark and light mode
//   };

//   const isDarkMode = theme === 'dark';
//   const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;
//   return (
//     <View style={[styles.container, themeStyles]}>
//       <ToggleSwitch
//         isOn={isDarkMode} // Reflect the current theme in the toggle switch
//         onColor="#0166FF"
//         offColor="#C4C4C4"
//         label="Dark Mode"
//         labelStyle={{
//           color: isDarkMode ? '#ffffff' : '#000000',
//           fontWeight: '900',
//         }}
//         size="medium"
//         onToggle={handleToggle}
//         animationSpeed={300}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   darkTheme: {
//     backgroundColor: '#000000',
//     color: '#ffffff',
//   },
//   lightTheme: {
//     backgroundColor: '#ffffff',
//     color: '#000000',
//   },
// });

import {View, StyleSheet} from 'react-native';
import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {useTheme} from '../../ContextAPI/ThemeContext'; // Adjust the import path

export default function DarkMode() {
  const {theme, toggleTheme} = useTheme(); // Access theme and toggle function

  const isDarkMode = theme === 'dark';
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;

  return (
    <View style={[styles.container, themeStyles]}>
      <ToggleSwitch
        isOn={isDarkMode} // Reflect the current theme in the toggle switch
        onColor="#0166FF"
        offColor="#C4C4C4"
        label="Dark Mode"
        labelStyle={{
          color: isDarkMode ? '#ffffff' : '#000000',
          fontWeight: '900',
        }}
        size="medium"
        onToggle={toggleTheme} // Toggle the theme
        animationSpeed={300}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkTheme: {
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
});
