import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const Subscription = (onPress: any) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Image source={Images.LeftArrow} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subscription</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Widen your world in minutes a day</Text>
        </View>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Image source={Images.subs1} style={styles.featureImage} />
            <Text style={styles.featureText}>Read Unlimited</Text>
          </View>
          <View style={styles.featureItem}>
            <Image source={Images.subs2} style={styles.featureImage} />
            <Text style={styles.featureText}>
              5,000+ Books & New each month
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Image source={Images.subs3} style={styles.featureImage} />
            <Text style={styles.featureText}>Listen Unlimited</Text>
          </View>
          <View style={styles.featureItem}>
            <Image source={Images.subs4} style={styles.featureImage} />
            <Text style={styles.featureText}>Highlight favorites</Text>
          </View>
        </View>
        <View style={styles.planContainer}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>Yearly</Text>
            <Text style={styles.planDiscount}>Save 50%</Text>
            <TouchableOpacity
              onPress={() => {
                //@ts-ignore
                navigation.navigate('SubscriptionForm');
              }}
              style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.planPrice}>$89.99/ month</Text>
            <Text>
              You will be charged a yearly subscription fee of $89.99
              immediately, without a trial period
            </Text>
          </View>
        </View>
        <View style={[styles.planContainer, styles.monthlyPlan]}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>Monthly</Text>

            <TouchableOpacity
              onPress={() => {
                //@ts-ignore
                navigation.navigate('SubscriptionForm');
              }}
              style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.planPrice}>$7.50/ month</Text>
            <Text>
              You will be charged a yearly subscription fee of $89.99
              immediately, without a trial period
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Subscription;
