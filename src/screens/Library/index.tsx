import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import ChatModal from '../../components/ChatModal';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import ChatList from '../../components/chatList';
import auth from '@react-native-firebase/auth'; // Firebase Authentication

const Library = (onPress: any, props: any) => {
  const navigation: any = useNavigation();
  const [users, setUsers] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const currentUser = auth().currentUser;
  const [currentUserData, setCurrentUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]); // State for filtered chats

  //@ts-ignore
  const cuid = currentUser.uid;
  console.log('cuid: ', cuid);

  useEffect(() => {
    const chatsCollection = firestore().collection('chats');

    // Set up the real-time listener using onSnapshot
    const unsubscribe = chatsCollection
      .where('userIds', 'array-contains', cuid)
      .onSnapshot(
        querySnapshot => {
          console.log(`Found ${querySnapshot.size} documents`);
          if (querySnapshot.empty) {
            console.log('No matching chat found.');
            setData([]); // Clear the data if no matching chats
            setFilteredData([]); // Clear the filtered data
          } else {
            // Collect all matching chats in real-time
            const chats = querySnapshot.docs.map(doc => ({
              ...doc.data(), // Spread the document data
              roomId: doc.id, // Add the roomId (document ID)
            }));
            setData(chats);
            setFilteredData(chats); // Initialize with all chats
          }
        },
        error => {
          console.error('Error getting chats:', error);
        },
      );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the current user ID
        const userId = auth().currentUser?.uid;
        console.log('Current User ID:', userId); // Debugging statement

        if (!userId) {
          console.error('User is not authenticated');
          return;
        }
        const userDoc = await firestore().collection('Users').doc(userId).get();
        console.log('Document Data:', userDoc.data()); // Debugging statement

        if (userDoc.exists) {
          //@ts-ignore
          setCurrentUserData(userDoc.data());
        } else {
          console.error('User document does not exist');
          setCurrentUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  // Function to filter chat data based on search query
  const filterNames = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(data); // Reset to all data if search query is empty
    } else {
      const filtered = data.filter(chat => {
        const users = chat?.users || [];
        const otherUser = users.find((user: any) => user.uid !== cuid);
        return otherUser?.userName?.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredData(filtered); // Set filtered chat data
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to delete a chat item
  const deleteChat = async (rowKey: string) => {
    try {
      // Delete the chat document from Firestore
      await firestore().collection('chats').doc(rowKey).delete();

      // Remove the chat from local state
      const newData = data.filter(item => item.roomId !== rowKey);
      setData(newData);
      setFilteredData(newData); // Ensure filtered data is updated as well
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const renderUserlist = ({item}: any) => {
    const users = item?.users || [];
    const otherUser = users.filter((user: any) => user.uid !== cuid);
    let title = 'N/A';
    if (otherUser && otherUser.length > 0) {
      title = otherUser[0].userName;
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          padding: 20,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingHorizontal: 20,
          // backgroundColor: 'transparent',
          backgroundColor: '#222222',
          borderBottomColor: 'white',
          borderBottomWidth: 1,
        }}
        onPress={() => {
          navigation.navigate('ChatScreen', {
            roomID: item.roomId,
            otherUser: otherUser[0],
            currentUser: currentUserData,
          });
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
          <View>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: '400',
                marginHorizontal: 17,
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: '#fff',
                marginHorizontal: 20,
              }}>
              {item.lastMessage || ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render hidden item (shown when swiped)
  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteChat(data.item.roomId)}>
        <Image
          source={Images.delete}
          style={{width: 34, height: 34, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{backgroundColor: '#000000'}}>
      <ImageBackground
        source={Images.wave}
        style={{
          width: 420,
          height: 820,
          flex: 1,
        }}
      />
      <StatusBar backgroundColor="#222222" barStyle="light-content" />
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          flexDirection: 'row',
        }}>
        <Image
          source={Images.chats}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            color: '#ffffff',
            fontSize: 28,
            fontWeight: '800',
            alignSelf: 'center',
            marginHorizontal: 15,
          }}>
          Chats
        </Text>
      </View>
      <View style={{borderWidth: 1, borderColor: '#fffff2'}}></View>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          placeholderTextColor={'white'}
          value={searchQuery}
          onChangeText={text => filterNames(text)} // Trigger the filter function
        />
      </View>
      {filteredData.length === 0 ? (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{color: '#fff', fontSize: 18}}>No results found</Text>
        </View>
      ) : (
        <SwipeListView
          data={searchQuery ? filteredData : data}
          renderItem={renderUserlist}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          leftOpenValue={75}
          disableRightSwipe
          keyExtractor={item => item.id}
          style={{overflow: 'hidden'}}
        />
      )}

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
  chatText: {
    fontSize: 18,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    height: 90,
    width: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  searchInput: {
    margin: 20,
    color: '#ffffff',
    borderRadius: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
