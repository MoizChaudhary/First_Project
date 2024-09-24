import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Firebase Authentication
import uuid from 'react-native-uuid';
import {Alert, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video'; // Import react-native-video

type Message = {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
  image?: string; // Optional field for image URL
  video?: string; // Optional field for video URL
};

const ChatScreen = (props: any) => {
  const navigation = useNavigation();
  const otherUser = props?.route?.params?.otherUser;
  const currentUser = props?.route?.params?.currentUser;
  const otherUserId = otherUser?.uid;
  const otherUserName = otherUser?.userName;
  const myId = currentUser?.uid || '';

  const [messages, setMessages] = useState<Message[]>([]);
  const [roomID, setRoomID] = useState(props?.route?.params?.roomID || '');

  // Fetch messages from the specific room
  useEffect(() => {
    if (roomID !== '') {
      const unsubscribe = firestore()
        .collection('chats')
        .doc(roomID) // Use the roomId to get the specific chat room
        .collection('messages') // Assuming messages are stored in a subcollection under the room
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const messagesFirestore: Message[] = querySnapshot.docs
            .map(doc => {
              const firebaseData = doc.data();

              const data: Message = {
                _id: doc.id,
                text: firebaseData.text || '',
                createdAt: firebaseData.createdAt.toDate(),
                user: firebaseData.user,
                image: firebaseData.image || null, // Handling image

                video: firebaseData.video || null, // Handling video
              };

              return data;
            })
            .filter(msg => msg !== null);

          setMessages(messagesFirestore);
        });

      return () => unsubscribe();
    }
  }, [roomID]);

  const onSend = useCallback(
    (newMessages: Message[] = []) => {
      const newMessage = newMessages[0];

      if (!newMessage?.text && !newMessage?.image && !newMessage?.video) {
        console.error('Message is empty or undefined');
        return;
      }

      const message: Message = {
        //@ts-ignore
        _id: uuid.v4(),
        text: newMessage.text || '',
        createdAt: new Date(),
        user: {
          _id: currentUser.uid,
          name: currentUser?.userName,
        },
        //@ts-ignore
        image: newMessage.image || null, // Add image field
        //@ts-ignore
        video: newMessage.video || null, // Add image field
        //@ts-ignore
        type: newMessage?.type || 'text',
      };

      if (roomID !== '') {
        sendMessageFirebase(message);
      } else {
        addChatRoomAndSendMessage(message);
      }
    },
    [myId, roomID],
  );

  const addChatRoomAndSendMessage = async (message: any) => {
    const chatRoomRef = await firestore()
      .collection('chats')
      .add({
        lastMessage: message.text || message.image, // Store the initial message or image as the last message
        userIds: [currentUser.uid, otherUser.uid], // Store both user IDs
        users: [currentUser, otherUser], // Store both user details
      });

    if (chatRoomRef?.id) {
      setRoomID(chatRoomRef?.id);
      await firestore()
        .collection('chats')
        .doc(chatRoomRef.id)
        .collection('messages')
        .add(message);

      await firestore()
        .collection('chats')
        .doc(chatRoomRef.id)
        .update({
          lastMessage: message.text || message.image, // Update with the latest message or image
          type: message.type,
        });
    }
  };

  const sendMessageFirebase = async (message: any) => {
    console.log('message: ', message);
    await firestore()
      .collection('chats')
      .doc(roomID) // Use the specific roomId to save messages
      .collection('messages')
      .add(message)
      .catch(error => {
        console.error('Error sending message to Firestore:', error);
      });

    await firestore()
      .collection('chats')
      .doc(roomID)
      .update({
        lastMessage: message.text || message.image || message.video, // Update with the latest message or image
        type: message.type,
      });
  };

  const renderSend = (props: any) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.sendButton} onPress={openCamera}>
          <Image
            source={Images.camera}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={pickImageFromGallery}>
          <Image
            source={Images.gallery}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={pickVideoFromGallery}>
          <Image
            source={Images.video}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            if (props.text && props.onSend) {
              props.onSend({text: props.text.trim()}, true);
            }
          }}>
          <Image
            source={Images.sendMessage}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const uploadFileToFirebase = async (file: any) => {
    const fileName = file.filename || `file-${Date.now()}`;
    const reference = storage().ref(fileName);

    try {
      await reference.putFile(file.path);
      const downloadUrl = await reference.getDownloadURL();

      Alert.alert('Upload Success', `File uploaded: ${downloadUrl}`);
      return downloadUrl;
    } catch (error) {
      console.log('Error uploading file: ', error);
      Alert.alert('Upload Failed', 'Something went wrong during the upload');
      throw error;
    }
  };

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        try {
          const imageUrl = await uploadFileToFirebase(image);
          const message = {
            text: '',
            image: imageUrl,
            createdAt: new Date(),
            user: {_id: myId, name: currentUser.userName},
            type: 'image',
          };
          //@ts-ignore
          onSend([message]);
        } catch (error) {
          console.log('Error uploading image:', error);
        }
      })
      .catch(error => {
        console.log('Error picking image: ', error);
      });
  };

  const pickVideoFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then(async video => {
        console.log('Video selected:', video); // Log video details

        try {
          const videoUrl = await uploadFileToFirebase(video);
          const message = {
            text: '',
            video: videoUrl,
            createdAt: new Date(),
            user: {_id: myId, name: currentUser.userName},
            type: 'video',
          };
          //@ts-ignore
          onSend([message]);
        } catch (error) {
          console.log('Error uploading video:', error);
        }
      })
      .catch(error => {
        console.log('Error picking video: ', error);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        const imageUrl = await uploadFileToFirebase(image);
        const message = {
          text: '',
          image: imageUrl,
          createdAt: new Date(),
          user: {_id: myId, name: currentUser.userName},
          type: 'image',
        };
        //@ts-ignore
        onSend([message]);
      })
      .catch(error => {
        console.log('Error opening camera: ', error);
      });
  };
  const renderMessageVideo = (props: any) => {
    const {currentMessage} = props;
    return (
      <View style={{width: 250, height: 180}}>
        <Video
          source={{uri: currentMessage.video}} // Video URL from message
          style={styles.videoPlayer}
          resizeMode="cover"
          controls={true} // Enable video controls
        />
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#FFFF', flex: 1}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          padding: 20,
          // marginVertical: 10,
          backgroundColor: '#000066',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            borderRadius: 35,
            backgroundColor: '#ffffff',
            alignSelf: 'center',
            // marginHorizontal: 10,
            marginVertical: 10,
            width: '100%',
            padding: 5,
          }}>
          <Image
            source={Images.GoBack}
            style={{
              width: 16,
              height: 16,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', marginHorizontal: 10}}>
          <Image
            source={Images.Avatar2}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              alignSelf: 'center',

              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
        <View style={{width: '60%'}}>
          <Text
            numberOfLines={1}
            style={{
              color: '#ffffff',
              fontSize: 23,
              marginHorizontal: 15,
              marginVertical: 4,
            }}>
            {otherUserName}
          </Text>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        //@ts-ignore
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: myId,
        }}
        renderSend={renderSend}
        renderMessageVideo={renderMessageVideo} // Adding video renderer
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    paddingHorizontal: 5,
    // backgroundColor: '#007bff',
    borderRadius: 5,
  },
  sendText: {
    color: '#000000',
    fontSize: 16,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default ChatScreen;
