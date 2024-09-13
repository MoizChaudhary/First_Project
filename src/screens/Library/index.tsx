import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import ChatList from '../../components/chatList/index';
import ChatModal from '../../components/ChatModal';
import Modal from 'react-native-modal';

const Library = (onPress: any, props: any) => {
  const navigation: any = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={{
        backgroundColor: '#000000',
        // flex: 1,
      }}>
      <ImageBackground
        source={Images.wave}
        style={{
          width: 420,
          height: 820,
          flex: 1,
        }}
      />
      <StatusBar backgroundColor="#222222" barStyle="light-content" />
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <Text style={{color: '#ffffff', fontSize: 28, fontWeight: '800'}}>
          Chats
        </Text>
      </View>
      <View style={{borderWidth: 1, borderColor: '#fffff2'}}></View>
      <ChatList navigation={navigation} />

      <TouchableOpacity
        style={{
          padding: 10,
          position: 'absolute',
          top: 700,
          right: 5,
        }}
        onPress={toggleModal}>
        <Image
          source={Images.plus}
          style={{
            width: 70,
            height: 70,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <ChatModal isModalVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  searchInput: {
    margin: 20,
    borderRadius: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
});
