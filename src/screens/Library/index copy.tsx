import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const Library = (onPress: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={{backgroundColor: '#222222', flex: 1}}>
      <StatusBar backgroundColor="#222222" barStyle="light-content" />
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <Text style={{color: '#ffffff', fontSize: 28, fontWeight: '800'}}>
          Chats
        </Text>
      </View>
      <View style={{borderWidth: 1, borderColor: '#fffff2'}}></View>

      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Image
            source={Images.Avatar2}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: '400',
                marginHorizontal: 20,
              }}>
              John Wick
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{marginRight: 35}}
          onPress={() => {
            navigation.navigate('ChatScreen', {
              data: {
                myId: '123', // Your user ID
                userId: '456', // The ID of the person you are chatting with
              },
            });
          }}>
          <Image
            source={Images.chats}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Image
            source={Images.Avatar1}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: '400',
                marginHorizontal: 20,
              }}>
              Paul
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{marginRight: 35}}
          onPress={() => {
            navigation.navigate('ChatScreen', {
              data: {
                myId: '123', // Your user ID
                userId: '456', // The ID of the person you are chatting with
              },
            });
          }}>
          <Image
            source={Images.chats}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Image
            source={Images.Avatar3}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: '400',
                marginHorizontal: 20,
              }}>
              Hamster
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{marginRight: 35}}
          onPress={() => {
            navigation.navigate('ChatScreen', {
              data: {
                myId: '123', // Your user ID
                userId: '456', // The ID of the person you are chatting with
              },
            });
          }}>
          <Image
            source={Images.chats}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({});
