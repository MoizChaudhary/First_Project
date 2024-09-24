import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ContactUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

      <Image
        source={require('../../assets/animation/ContactUs.gif')} // Path to your GIF
        style={styles.gif}
      />

      <Text style={styles.info}>
        For inquiries, email us at contact@example.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  gif: {
    width: 300,
    height: 300, // Adjust size based on the GIF dimensions
    marginBottom: 30,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
});

export default ContactUs;
