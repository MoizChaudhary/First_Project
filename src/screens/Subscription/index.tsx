import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Btn from '../../components/btn';

const Subscription = (onPress: any) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF8F5'}}>
      <ScrollView>
        <View
          style={{flexDirection: 'row', marginHorizontal: 15, marginTop: 15}}>
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 4}}>
            <Image
              source={Images.LeftArrow}
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: '#191C20',
              fontWeight: '700',
              marginHorizontal: 10,
            }}>
            Subscription
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#EFEFEF',
            marginVertical: 10,
          }}></View>
        <View style={{marginHorizontal: 20}}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: '#191C20',
              marginTop: 20,
            }}>
            Widen your world in minutes a day
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <Image
              source={Images.subs1}
              style={{
                width: 15,
                height: 15,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{color: '#191C20', fontSize: 14, marginHorizontal: 10}}>
              Read Unlimited
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <Image
              source={Images.subs2}
              style={{
                width: 15,
                height: 15,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{color: '#191C20', fontSize: 14, marginHorizontal: 10}}>
              5,000+ Books & New each month
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <Image
              source={Images.subs3}
              style={{
                width: 15,
                height: 15,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{color: '#191C20', fontSize: 14, marginHorizontal: 10}}>
              Listen Unlimited
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <Image
              source={Images.subs4}
              style={{
                width: 15,
                height: 15,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{color: '#191C20', fontSize: 14, marginHorizontal: 10}}>
              Highlight favorites
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: '#191C20',
                fontSize: 18,
                fontWeight: '700',
                marginHorizontal: 10,
                alignSelf: 'center',
              }}>
              Yearly
            </Text>
            <Text
              style={{
                color: '#0166FF',
                fontSize: 16,
                backgroundColor: '#E8F1FF',
                marginHorizontal: 20,
                borderRadius: 4,
                padding: 5,
                alignSelf: 'center',
              }}>
              Save 50%
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#0166FF',
                padding: 12,
                borderRadius: 5,
              }}>
              <Text style={{color: '#ffffff'}}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                color: '#0166FF',
                fontSize: 24,
                fontWeight: '800',
                marginVertical: 10,
              }}>
              $89.99/ month
            </Text>
            <Text>
              You will be charged a yearly subscription fee of $89.99
              immediately, without a trial period
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            padding: 10,
            marginVertical: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: '#191C20',
                fontSize: 18,
                fontWeight: '700',
                marginHorizontal: 10,
                alignSelf: 'center',
              }}>
              Monthly
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#0166FF',
                padding: 12,
                borderRadius: 5,
              }}>
              <Text style={{color: '#ffffff'}}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                color: '#0166FF',
                fontSize: 24,
                fontWeight: '800',
                marginVertical: 10,
              }}>
              $7.50/ month
            </Text>
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

const styles = StyleSheet.create({});
