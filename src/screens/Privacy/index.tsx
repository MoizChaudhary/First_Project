import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import Btn from '../../components/btn';
import {useNavigation} from '@react-navigation/native';

const Privacy = () => {
  const navigate = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#060A75', height: '50%'}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            justifyContent: 'space-between',
            marginHorizontal: 20,
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 25,
              backgroundColor: '#ffff',
              borderWidth: 1,
              padding: 8,
              alignSelf: 'center',
            }}
            onPress={() => {
              navigate.goBack();
            }}>
            <Image
              source={Images.GoBack}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                justifyContent: 'space-between',
              }}
            />
          </TouchableOpacity>
          <Text style={{color: '#ffff', fontSize: 24}}> Privacy & Policy</Text>
          <TouchableOpacity>
            <Image
              source={Images.share}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#ffff',
            height: '120%',
            marginHorizontal: 30,
            borderRadius: 20,
            top: 60,
          }}>
          <View style={{marginHorizontal: 20, padding: 20}}>
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#CEFFB9',
                padding: 10,
                borderRadius: 45,
              }}>
              <Image
                source={Images.Verified}
                style={{width: 55, height: 55, resizeMode: 'contain'}}
              />
            </View>
            <Text style={{fontSize: 16, fontWeight: '800', color: '#000000'}}>
              Privacy Policy:
            </Text>
            <Text style={{marginVertical: 10}}>
              Information Collected: Types of personal and non-personal data
              collected. Collection Methods: How we gather information (e.g.,
              directly, cookies). Usage: Purposes for which the collected data
              is used. Data Sharing: Instances where data may be shared with
              third parties. Security: Measures in place to protect user data.
            </Text>
            <Text style={{fontSize: 16, fontWeight: '800', color: '#000000'}}>
              Terms of Service:
            </Text>
            <Text style={{marginVertical: 10}}>
              Acceptance: Agreement to terms by using the app. Eligibility:
              Requirements for using the app (e.g., age). Account
              Responsibility: User responsibilities for account security.
              Permitted Use: Guidelines for acceptable use of the app. Content
              Ownership: Rights to app content and user-generated content.
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        //   onPress={onPress}
        style={{
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          bottom: 25,
          backgroundColor: '#060A75',
          marginHorizontal: 25,
          padding: 15,
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: '#ffffff',
            alignSelf: 'center',
          }}>
          Agree & Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({});
