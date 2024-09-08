import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import uuid from 'react-native-uuid';
import {SvgXml} from 'react-native-svg';
import {SendMessage} from '../../assets/svg/send';

const reactionsList = ['👍', '❤️', '😂', '😮', '😢', '😡']; // Emoji reactions

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedMessage, setSelectedMessage] = useState(null); // For reaction modal
  const [showReactions, setShowReactions] = useState(false); // Show reaction modal

  useEffect(() => {
    // Simulate a delay for loading
    setTimeout(() => {
      setMessages([
        //@ts-ignore
        {
          _id: uuid.v4(), // Use react-native-uuid to generate a unique ID
          text: 'Hello! How can I assist you today? How are you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Support',
            avatar: require('../../assets/images/Avatar1.jpg'), // Support's avatar
          },
          reactions: [], // No reactions initially
        },
      ]);
      setLoading(false); // Set loading to false once messages are set
    }, 2000); // Simulate 2 seconds loading time
  }, []);

  // Update the onSend function to include reactions: []
  const onSend = useCallback((newMessages = []) => {
    const messagesWithReactions = newMessages.map(message => ({
      //@ts-ignore
      ...message,
      reactions: [],
    }));
    //@ts-ignore
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messagesWithReactions),
    );
  }, []);

  const handleAddReaction = (reaction: any) => {
    if (selectedMessage) {
      //@ts-ignore
      setMessages(previousMessages =>
        previousMessages.map(message =>
          //@ts-ignore
          message._id === selectedMessage._id
            ? {
                //@ts-ignore
                ...message,
                //@ts-ignore
                reactions: [...message.reactions, reaction],
              }
            : message,
        ),
      );
    }
    setShowReactions(false); // Close the reaction modal after selecting
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#FFAC06', // Custom background color for the toolbar
          padding: 5,
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <SvgXml xml={SendMessage} width={35} height={35} />
      </Send>
    );
  };

  console.log('messages', messages);

  const renderBubble = (props: any) => {
    const messageReactions = props.currentMessage.reactions || [];

    return (
      <View>
        <Bubble
          {...props}
          onLongPress={() => {
            setSelectedMessage(props.currentMessage);
            setShowReactions(true); // Open reaction modal on long press
          }}
          wrapperStyle={{
            right: {
              backgroundColor: '#FFAC06', // Custom color for user messages
            },
          }}
          textStyle={{
            right: {
              color: '#fff', // Custom text color for user messages
            },
          }}
        />

        {/* Reaction button for quick access */}
        {/* <TouchableOpacity
          onPress={() => {
            setSelectedMessage(props.currentMessage);
            setShowReactions(true); // Open reaction modal
          }}
          style={{marginLeft: 10}}>
          <Text style={{fontSize: 18}}>😊</Text>
        </TouchableOpacity> */}

        {/* Display reactions */}
        {messageReactions.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              left: props.currentMessage?.user?._id > 1 ? 0 : 50,

              // width: 40,
              marginTop: 5,
              // paddingLeft: messages[0].user._id ? 10 : 0,
              // marginRight: messages[0].user._id ? 0 : 120,
              // backgroundColor: 'red',
            }}>
            {messageReactions.map((reaction: any, index: any) => (
              // console.log('user', messages[0].user._id),
              <Text key={index} style={{fontSize: 20, fontWeight: 'bold'}}>
                {reaction}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    // Show activity indicator while loading
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#222222" barStyle="light-content" />

      <GiftedChat
        messagesContainerStyle={{backgroundColor: '#222222'}}
        messages={messages}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        //@ts-ignore
        onSend={messages => onSend(messages)}
        textInputProps={{
          placeholderTextColor: '#FFFFFF', // Change the placeholder text color here
          style: {
            color: '#000000', // Change the typed message text color
            width: '85%',
          },
        }}
        user={{
          _id: 1, // Current user ID
          name: 'You',
          avatar: require('../../assets/images/Avatar2.jpg'), // Static path for user's avatar
        }}
        renderBubble={renderBubble} // Custom renderBubble for user
      />

      {/* Reaction Modal */}
      <Modal visible={showReactions} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            {reactionsList.map(reaction => (
              <TouchableOpacity
                key={reaction}
                onPress={() => handleAddReaction(reaction)}
                style={{marginHorizontal: 10}}>
                <Text style={{fontSize: 30}}>{reaction}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatScreen;
