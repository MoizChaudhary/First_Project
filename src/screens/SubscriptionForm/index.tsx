import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Btn from '../../components/btn';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const Subscription = (onPress: any) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBack} onPress={handleGoBack}>
          <Image source={Images.LeftArrow} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Subscription</Text>
      </View>
      <View style={styles.divider}></View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centerContent}>
          <Text style={styles.mainText}>
            Build a learning habit you’ll love to keep
          </Text>
          <Image
            source={require('../../assets/animation/subscription.gif')} // Path to your GIF
            style={{
              width: 350,
              height: 300, // Adjust size based on the GIF dimensions
              marginBottom: 30,
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.price}>$7.50/ month</Text>
          <Text style={styles.description}>
            You will be charged a yearly subscription fee of $89.99 immediately,
            without a trial period
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Btn
          title="Subscribe"
          onPress={() => {
            //@ts-ignore
            navigation.navigate('Payment');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Subscription;
