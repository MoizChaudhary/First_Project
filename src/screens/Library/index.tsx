import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';

const Library = () => {
  const [theme, setTheme] = useState('light'); // Default to light mode

  const handleToggle = (isOn: any) => {
    setTheme(isOn ? 'dark' : 'light'); // Toggle between dark and light mode
  };

  const isDarkMode = theme === 'dark';
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;

  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={[styles.text, themeStyles]}>Library</Text>
      <View>
        <Text style={[styles.text, themeStyles]}>This is a themed text.</Text>
        <Text style={[styles.text, themeStyles]}>Another themed text.</Text>
      </View>
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
        onToggle={handleToggle}
        animationSpeed={300}
      />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
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
