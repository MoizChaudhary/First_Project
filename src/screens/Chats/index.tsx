import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Firebase Authentication
import uuid from 'react-native-uuid';
import {Image, StatusBar, Text, View} from 'react-native';
import {Images} from '../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type Message = {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
};

const ChatScreen = (props: any) => {
  const navigation = useNavigation();
  const otherUser = props?.route?.params?.otherUser;
  const currentUser = props?.route?.params?.currentUser;
  // console.log('roomID: ', roomID);
  // console.log('otherUser: ', otherUser);
  // console.log('currentUser: ', currentUser);
  const otherUserId = otherUser?.uid;
  const otherUserName = otherUser?.userName;
  const myId = currentUser.uid;

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
          console.log('------------->>>>>>>> querySnapshot: ', querySnapshot);
          const messagesFirestore: Message[] = querySnapshot.docs
            .map(doc => {
              const firebaseData = doc.data();

              if (
                !firebaseData.text ||
                !firebaseData.createdAt ||
                !firebaseData.user ||
                !firebaseData.user._id ||
                !firebaseData.user.name
              ) {
                console.error(
                  'Firestore data missing required fields:',
                  firebaseData,
                );
                return null;
              }

              const data: Message = {
                _id: doc.id,
                text: firebaseData.text,
                createdAt: firebaseData.createdAt.toDate(),
                user: firebaseData.user,
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

      if (!newMessage?.text || newMessage.text.trim() === '') {
        console.error('Message is empty or undefined');
        return;
      }

      const message: Message = {
        //@ts-ignore
        _id: uuid.v4(),
        text: newMessage.text,
        createdAt: new Date(),
        user: {
          _id: currentUser.uid,
          // name: myId === 'some_fixed_id_for_you' ? 'You' : 'Support', // Adjust logic as needed
          name: currentUser?.userName,
        },
      };

      if (
        !message.text ||
        !message.createdAt ||
        !message.user ||
        !message.user._id ||
        !message.user.name
      ) {
        console.error('Message contains undefined fields:', message);
        return;
      }

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
        lastMessage: message.text, // Store the initial message as the last message
        userIds: [currentUser.uid, otherUser.uid], // Store both user IDs
        users: [currentUser, otherUser], // Store both user details
      });
    console.log('Chat room created with ID:', chatRoomRef.id);

    if (chatRoomRef?.id) {
      setRoomID(chatRoomRef?.id);
      await firestore()
        .collection('chats')
        .doc(chatRoomRef.id)
        .collection('messages')
        .add(message);

      await firestore().collection('chats').doc(chatRoomRef.id).update({
        lastMessage: message.text, // Update with the initial message or latest message
      });
    }
  };

  const sendMessageFirebase = async (message: any) => {
    await firestore()
      .collection('chats')
      .doc(roomID) // Use the specific roomId to save messages
      .collection('messages')
      .add(message)
      .catch(error => {
        console.error('Error sending message to Firestore:', error);
      });

    await firestore().collection('chats').doc(roomID).update({
      lastMessage: message.text, // Update with the initial message or latest message
    });
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
      {/* <View
        style={{
          borderWidth: 1,
          backgroundColor: 'black',
        }}></View> */}
      <GiftedChat
        messages={messages}
        //@ts-ignore
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: myId || 0,
        }}
      />
    </View>
  );
};

export default ChatScreen;
